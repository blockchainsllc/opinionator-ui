import { getGasForProposal, getMinerForProposal, getDevForProposal } from './DatabaseInterface.js'
import { BigNumber } from 'bignumber.js';

export async function getProposalData(web3Interface, proposalIds, coinWeight, gasWeight, developerWeight, minerWeight, proposals) {
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
        miner: new BigNumber((await getMinerForProposal(tempProposal.pollId, proposalIds[i])).gas_sum)
      }
      proposals.push(proposal)
    }
  } else {
    proposals.map((proposal) => {
      proposal.gas = new BigNumber(proposal.gas);
      proposal.coin = new BigNumber(proposal.coin);
      proposal.dev = new BigNumber(proposal.dev);
      proposal.miner = new BigNumber(proposal.miner);
    })
  }

  const coinSum = new BigNumber(proposals.map((proposal) => proposal.coin).reduce((previous, current) => previous.plus(current), new BigNumber(0)))
  const gasSum = new BigNumber(proposals.map((proposal) => proposal.gas).reduce((previous, current) => previous.plus(current), new BigNumber(0)))
  const devSum = new BigNumber(proposals.map((proposal) => proposal.dev).reduce((previous, current) => previous.plus(current), new BigNumber(0)))
  const minerSum = new BigNumber(proposals.map((proposal) => proposal.miner).reduce((previous, current) => previous.plus(current), new BigNumber(0)))

  proposals.map((proposal) => {
    proposal.percentage = calculateProposalPercentage(proposal.coin, proposal.gas, proposal.dev, proposal.miner, coinSum, gasSum, devSum, minerSum, coinWeight, gasWeight, developerWeight, minerWeight)

    //parse values to readable strings
    proposal.gas = proposal.gas.toString()
    proposal.coin = proposal.coin.toString()
    proposal.dev = proposal.dev.toString()
    proposal.miner = proposal.miner.toString()
  })

  return proposals
}

async function getProposal(web3Interface, proposalId) {
  return await web3Interface.contract.methods.proposals(proposalId).call()
}

function calculateProposalPercentage(coin, gas, dev, miner, coinSum, gasSum, devSum, minerSum, coinWeight, gasWeight, developerWeight, minerWeight) {

  let weightSum = 0;
  if (!coinSum.isZero())
    weightSum += coinWeight
  if (!gasSum.isZero())
    weightSum += gasWeight
  if (!devSum.isZero())
    weightSum += developerWeight
  if (!minerSum.isZero())
    weightSum += minerWeight

  let coinPartOfThePie = coinSum.comparedTo(new BigNumber(0)) === 1 ? new BigNumber((coin.dividedBy(coinSum).multipliedBy(new BigNumber(coinWeight / weightSum)))) : new BigNumber(0)
  let gasPartOfThePie = gasSum.comparedTo(new BigNumber(0)) === 1 ? new BigNumber((gas.dividedBy(gasSum).multipliedBy(new BigNumber(gasWeight / weightSum)))) : new BigNumber(0)
  let devPartOfThePie = devSum.comparedTo(new BigNumber(0)) === 1 ? new BigNumber((dev.dividedBy(devSum).multipliedBy(new BigNumber(developerWeight / weightSum)))) : new BigNumber(0)
  let minerPartOfThePie = minerSum.comparedTo(new BigNumber(0)) === 1 ? new BigNumber((miner.dividedBy(minerSum).multipliedBy(new BigNumber(minerWeight / weightSum)))) : new BigNumber(0)

  return parseInt(coinPartOfThePie.plus(gasPartOfThePie).plus(devPartOfThePie).plus(minerPartOfThePie).multipliedBy(100).valueOf())
}

export async function getPollAmount(web3Interface) {
  return parseInt(await web3Interface.contract.methods.getPollAmount().call(), 10)
}

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