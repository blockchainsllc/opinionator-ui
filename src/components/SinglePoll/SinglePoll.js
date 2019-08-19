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

import React, { Component } from 'react';
import SinglePollProposal from './SinglePollProposal';
import SinglePollPieChart from './SinglePollPieChart';
import SinglePollSlider from './SinglePollSlider';
import SinglePollProposalVotingModal from './SinglePollProposalVotingModal'
import SinglePollHistory from './SinglePollHistory'
import { getProposalData, sumValuesFromProposals } from '../../interfaces/DataInterface';
import SinglePollAdminFunctions from './SinglePollAdminFunctions';
import '../styles/SinglePoll.css'

class SinglePoll extends Component {
  constructor(props) {
    super(props); //@dev {this.props.pollId}
    this.state = {
      poll: null,
      proposals: [],
      pageLoaded: false,
      activeMetamaskAccount: '',
      showModal: false,
      showVotingModal: false,
      proposalsExist: false,

      coinSliderValue: 50,
      gasSliderValue: 50,
      devSliderValue: 50,
      minerSliderValue: 50,

      coinSum: 0,
      gasSum: 0,
      devSum: 0,
      minerSum: 0
    }
    this.getProposalDataFromInterface = this.getProposalDataFromInterface.bind(this)
    this.handleButtonAdminFunctionsOnClick = this.handleButtonAdminFunctionsOnClick.bind(this)
    this.handleCloseVotingModal = this.handleCloseVotingModal.bind(this)
    this.handleButtonVoteClicked = this.handleButtonVoteClicked.bind(this)
  }

  async componentDidMount() {

    if (this.props.poll && this.props.web3Interface) {
      await this.getProposalDataFromInterface(null);

      const [coinSum, gasSum, devSum, minerSum] = sumValuesFromProposals(this.state.proposals)
      this.setState({
        coinSum: coinSum,
        gasSum: gasSum,
        devSum: devSum,
        minerSum: minerSum,
      })

      await this.props.web3Interface.initAccounts()
      let accounts = await this.props.web3Interface.web3.eth.getAccounts()
      this.setState({
        activeMetamaskAccount: accounts[0]
      })
    }
  }

  async getProposalDataFromInterface(oldProposals) {
    const proposals = await getProposalData(this.props.web3Interface, this.props.poll.proposalIds, this.props.poll.votes, this.state.coinSliderValue, this.state.gasSliderValue, this.state.devSliderValue, this.state.minerSliderValue, oldProposals)
    if(proposals === undefined || proposals.length === 0)
      this.setState({
        proposals: proposals,
        pageLoaded: true,
      })
    else
      this.setState({
        proposals: proposals,
        pageLoaded: true,
        proposalsExist: true,
      })
  }

  onCoinSliderChange(e) {
    this.setState({
      coinSliderValue: e
    })
    this.getProposalDataFromInterface(this.state.proposals);
  }

  onGasSliderChange(e) {
    this.setState({
      gasSliderValue: e
    })
    this.getProposalDataFromInterface(this.state.proposals);
  }

  onDevSliderChange(e) {
    this.setState({
      devSliderValue: e
    })
    this.getProposalDataFromInterface(this.state.proposals);
  }

  onMinerSliderChange(e) {
    this.setState({
      minerSliderValue: e
    })
    this.getProposalDataFromInterface(this.state.proposals);
  }

  handleButtonAdminFunctionsOnClick() {
    this.setState({
      showModal: !this.state.showModal
    })
  }

  handleCloseVotingModal() {
    this.setState({
      showVotingModal: false
    })
  }

  handleButtonVoteClicked() {
    this.setState({
      showVotingModal: true
    })
  }

  render() {

    return (
      <div>
      {this.state.showVotingModal ? < SinglePollProposalVotingModal pollTitle={this.props.poll.title} handleCloseVotingModal={this.handleCloseVotingModal} web3Interface={this.props.web3Interface} pollContractAddress={this.props.web3Interface.contractAddress} pollId={this.props.poll.id} proposalData={this.state.proposals}/> : null}
      {this.state.pageLoaded ? <section className="section">
        <div className="container has-gutter-top-bottom has-text-centered">
            <div className="title">{this.props.poll.title}</div>
            <div className="subtitle">{this.props.poll.description}</div>
            <div>created by {this.props.poll.author}</div> 
            <div className="title is-4">{new Date(this.props.poll.startDate * 1000).toLocaleDateString()}  -  {this.props.poll.endDate !== "0" ? new Date(this.props.poll.endDate * 1000).toLocaleDateString() : "no end date"}</div>
            <div className="title is-5">{this.props.poll.votes.length} Votes</div>
            
            {(this.props.poll.author === this.state.activeMetamaskAccount) && (this.props.poll.endDate === "0" || this.props.poll.endDate > Date.now() / 1000) ? <button className="button is-link is-medium" onClick={this.handleButtonAdminFunctionsOnClick}>Admin functions</button> : null}
            {this.state.showModal ? <SinglePollAdminFunctions handleButtonAdminFunctionsOnClick={this.handleButtonAdminFunctionsOnClick} isStandardPoll={this.props.poll.standardPoll} web3Interface={this.props.web3Interface} pollId={this.props.poll.id} /> : null}
            <div className="yes-padding">
              <button className="button is-link is-medium" onClick={this.handleButtonVoteClicked} disabled={!this.state.proposalsExist}>Click here to vote</button>
            </div>
            <section className="section">
            {this.state.proposals.map((proposal) => <SinglePollProposal proposalData={proposal} key={proposal.name} pollId={this.props.poll.id} endDate={this.props.poll.endDate} pollContractAddress={this.props.web3Interface.contractAddress} web3Interface={this.props.web3Interface} />)}
            </section>
            {this.state.proposalsExist?
            <section className="section">
                <div className="columns is-vcentered">
                    <div className="column is-6">
                        <div>
                            <SinglePollPieChart proposalData={this.state.proposals}/>
                        </div>
                    </div>
                    <div className="column is-6">
                        <div>
                            <div className="columns is-vcentered">
                                <div className="column has-text-left"> Gas </div>
                                <div className="column is-8 no-padding">
                                  {this.state.gasSum.toString() !== "0"?
                                  <SinglePollSlider currentValue={this.state.gasSliderValue} onSliderChange={(e) => this.onGasSliderChange(e)}/>:
                                  <SinglePollSlider currentValue={0} onSliderChange={(newValue) => {}}/>}
                                </div>
                                <div className="column is-tablet is-2"/>
                            </div>
                            <div className="columns is-vcentered">
                                <div className="column has-text-left"> Coins </div>
                                <div className="column is-8 no-padding">
                                  {this.state.coinSum.toString() !== "0"?
                                  <SinglePollSlider currentValue={this.state.coinSliderValue} onSliderChange={(e) => this.onCoinSliderChange(e)}/>:
                                  <SinglePollSlider currentValue={0} onSliderChange={(newValue) => {}}/>}
                                </div>
                                <div className="column is-tablet is-2"/>
                            </div>
                            <div className="columns is-vcentered">
                                <div className="column has-text-left"> Dev </div>
                                <div className="column is-8 no-padding">
                                  {this.state.devSum.toString() !== "0"?
                                  <SinglePollSlider currentValue={this.state.devSliderValue} onSliderChange={(e) => this.onDevSliderChange(e)}/>:
                                  <SinglePollSlider currentValue={0} onSliderChange={(newValue) => {}}/>}
                                </div>
                                <div className="column is-tablet is-2"/>
                            </div>
                            <div className="columns is-vcentered">
                                <div className="column has-text-left"> Miner </div>
                                <div className="column is-8 no-padding">
                                  {this.state.minerSum.toString() !== "0"?
                                    <SinglePollSlider currentValue={this.state.minerSliderValue} onSliderChange={(e) => this.onMinerSliderChange(e)}/>:
                                    <SinglePollSlider currentValue={0} onSliderChange={(newValue) => {}}/>}
                                    
                                </div>
                                <div className="column is-tablet is-2"/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            :null}
            <SinglePollHistory/>
        </div>
      </section> : 
        <section className="hero is-fullheight is-light">
                <div className="hero-body">
                    <div className="container">
                        <div className="columns is-centered">
                            <div className="column is-2">
                            <div className="title">Loading...</div>
                            </div>
                        </div>
                    </div>
                </div>
        </section>}
        
      </div>
      );
  }
}

export default SinglePoll;