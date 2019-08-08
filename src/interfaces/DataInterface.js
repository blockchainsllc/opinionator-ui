// This file is part of the opinionator project

// Copyright (C) 2019  Jonas Bentke <jonas@slock.it>, Slock.it GmbH
 
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// [Permissions of this strong copyleft license are conditioned on making available complete source code of licensed works and modifications, which include larger works using a licensed work, under the same license. Copyright and license notices must be preserved. Contributors provide an express grant of patent rights.]
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.


import { getGasForProposal, getMinerForProposal, getDevForProposal } from './DatabaseInterface.js'
import { BigNumber } from 'bignumber.js';

// Collects all necessary information on all proposals and builds an array containing all proposals
//@param web3Interface The initialized web3Interface
//@param proposalIds A list of proposalIds which indicates what proposals will be loaded form the blockchain
//@param coinWeight, gasWeight, developerWeight, minerWeight The values that indicate how much weight should be put into each individual key value (comes form the sliders)
//@param proposals This contains the proposals already set before. This prevents unnessassary calls to the database. If this is null, the proposals will be 
//                 pulled from the database and the blockchain. If you pass proposals, it will calculate the proposal percentage new depending on the new 
//                 parameter passed to the function.
export async function getProposalData(web3Interface, proposalIds, pollVotes, coinWeight, gasWeight, developerWeight, minerWeight, proposals) {
  if (!proposals) {
    proposals = []
    for (let i = 0; i < proposalIds.length; i++) {
      let tempProposal = await getProposal(web3Interface, proposalIds[i])
      let gasAndCoinSum = await getGasForProposal(tempProposal.pollId, proposalIds[i])
      let proposal = {
        id: proposalIds[i],
        name: tempProposal.name,
        description: tempProposal.description,
        author: tempProposal.author,
        pollId: tempProposal.pollId,
        activated: tempProposal.activated,
        coin: new BigNumber(gasAndCoinSum.coin_sum),
        gas: new BigNumber(gasAndCoinSum.gas_sum),
        dev: new BigNumber((await getDevForProposal(tempProposal.pollId, proposalIds[i])).gas_sum),
        miner: new BigNumber((await getMinerForProposal(tempProposal.pollId, proposalIds[i])).gas_sum),
        numberOfVotes: getNumberOfVotesForProposal(proposalIds[i], pollVotes),
      }
      proposals.push(proposal)
    }
  } else {
    //converts them into bigNumber values for later calculations
    proposals.map((proposal) => {
      proposal.gas = new BigNumber(proposal.gas);
      proposal.coin = new BigNumber(proposal.coin);
      proposal.dev = new BigNumber(proposal.dev);
      proposal.miner = new BigNumber(proposal.miner);
      return proposal
    })
  }
  //sums up the key values for all proposals, necessary to calculate proposal percentage
  const [coinSum, gasSum, devSum, minerSum] = sumValuesFromProposals(proposals)
  const numberOfVotesSum = pollVotes.length

  proposals.map((proposal) => {
    proposal.percentage = calculateProposalPercentage(proposal.coin, proposal.gas, proposal.dev, proposal.miner, proposal.numberOfVotes, coinSum, gasSum, devSum, minerSum, numberOfVotesSum, coinWeight, gasWeight, developerWeight, minerWeight)

    //parse values to readable strings (so the UI can depict them easier)
    proposal.gas = proposal.gas.toString()
    proposal.coin = proposal.coin.toString()
    proposal.dev = proposal.dev.toString()
    proposal.miner = proposal.miner.toString()

    return proposal
  })

  return proposals
}

export function sumValuesFromProposals(proposals) {
  const coinSum = new BigNumber(proposals.map((proposal) => proposal.coin).reduce((previous, current) => previous.plus(current), new BigNumber(0)))
  const gasSum = new BigNumber(proposals.map((proposal) => proposal.gas).reduce((previous, current) => previous.plus(current), new BigNumber(0)))
  const devSum = new BigNumber(proposals.map((proposal) => proposal.dev).reduce((previous, current) => previous.plus(current), new BigNumber(0)))
  const minerSum = new BigNumber(proposals.map((proposal) => proposal.miner).reduce((previous, current) => previous.plus(current), new BigNumber(0)))
  return [coinSum, gasSum, devSum, minerSum]
}

async function getProposal(web3Interface, proposalId) {
  return await web3Interface.contract.methods.proposals(proposalId).call()
}

function getNumberOfVotesForProposal(proposalId, pollVotes) {
  return pollVotes.filter((vote) => vote.proposalId === proposalId).length;
}
//calculates the percentage a proposal has
//@param coin Amount of coins assigned to the proposal
//@param gas Amount of gas assigned to the proposal
//@param dev Amount of developer gas assigned to the proposal
//@param miner Amount of hash power assigned to the proposal
//@param coinSum, gasSum, devSum, minerSum Sum of key value from all proposals
//@param coinWeight, gasWeight, developerWeight, minerWeight The weight given to the key value (between 0 and 100)
function calculateProposalPercentage(coin, gas, dev, miner, numberOfVotes, coinSum, gasSum, devSum, minerSum, numberOfVotesSum, coinWeight, gasWeight, developerWeight, minerWeight) {

  //this ensures that 0 values will not go into the percentage calculation
  let weightSum = 0;
  if (!coinSum.isZero())
    weightSum += coinWeight
  if (!gasSum.isZero())
    weightSum += gasWeight
  if (!devSum.isZero())
    weightSum += developerWeight
  if (!minerSum.isZero())
    weightSum += minerWeight

  //if all sliders are turned to 0, then calculate the pie parts dependend on the number of votes
  if(weightSum === 0) {
    return parseInt(100 * numberOfVotes / numberOfVotesSum)
  }
  
  //calculates the 4 parts of the overall proposal percentage. Each part is calculated by: key / keySum * (keyWeight / weightSum)
  let coinPartOfThePie = coinSum.comparedTo(new BigNumber(0)) === 1 ? new BigNumber((coin.dividedBy(coinSum).multipliedBy(new BigNumber(coinWeight / weightSum)))) : new BigNumber(0)
  let gasPartOfThePie = gasSum.comparedTo(new BigNumber(0)) === 1 ? new BigNumber((gas.dividedBy(gasSum).multipliedBy(new BigNumber(gasWeight / weightSum)))) : new BigNumber(0)
  let devPartOfThePie = devSum.comparedTo(new BigNumber(0)) === 1 ? new BigNumber((dev.dividedBy(devSum).multipliedBy(new BigNumber(developerWeight / weightSum)))) : new BigNumber(0)
  let minerPartOfThePie = minerSum.comparedTo(new BigNumber(0)) === 1 ? new BigNumber((miner.dividedBy(minerSum).multipliedBy(new BigNumber(minerWeight / weightSum)))) : new BigNumber(0)

  //all parts summed up and multiplied by 100 to receive percentage
  return parseInt(coinPartOfThePie.plus(gasPartOfThePie).plus(devPartOfThePie).plus(minerPartOfThePie).multipliedBy(100).valueOf())
}

//Blockchain request
export async function getPollAmount(web3Interface) {
  try {
    return parseInt(await web3Interface.contract.methods.getPollAmount().call(), 10)
  } catch {
    return 0;
  }
}

//Blockchain request
export async function getPoll(web3Interface, pollId) {
  var tempPoll = await web3Interface.contract.methods.polls(pollId).call()
  var poll = {
    id: pollId,
    title: tempPoll.name,
    description: tempPoll.description,
    author: tempPoll.author,
    startDate: tempPoll.startDate,
    endDate: tempPoll.endDate,
    proposalIds: await web3Interface.contract.methods.getProposalsFromPoll(pollId).call(),
    allowProposalUpdate: tempPoll.allowProposalUpdate,
    standardPoll: tempPoll.standardPoll,
    votingChoice: tempPoll.votingChoice
  }
  return poll
}

//Blockchain request
export async function createPoll(web3Interface, name, description, startDate, endDate, votingChoice, standardPoll) {
  startDate = new Date(startDate).getTime() / 1000
  endDate = new Date(endDate).getTime() / 1000
  let accounts = await web3Interface.web3.eth.getAccounts()
  try {
    await web3Interface.contract.methods.createPoll(name, description, startDate, endDate, votingChoice, standardPoll).send({
      from: accounts[0]
    })
  } catch (error) {
    console.log("Metamask denied\n" + error)
  }
}

//Blockchain request
export async function createProposal(web3Interface, name, description, pollId) {
  let accounts = await web3Interface.web3.eth.getAccounts()
  try {
    await web3Interface.contract.methods.createProposal(name, description, pollId).send({
      from: accounts[0]
    })
  } catch (error) {
    alert("An Error occoured while sending the transaction!\n" + error)
  }
}