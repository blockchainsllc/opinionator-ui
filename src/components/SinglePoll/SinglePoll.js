//
// This file is part of voting-ui-new.
// 
// It is subject to the terms and conditions defined in
// file 'LICENSE.', which is part of this source code package.
//
// @author Jonas Bentke 
// @version 0.1
// @copyright 2018 by Slock.it GmbH
//

import React, { Component } from 'react';
import SinglePollProposal from './SinglePollProposal';
import SinglePollPieChart from './SinglePollPieChart';
import SinglePollSlider from './SinglePollSlider';
import { getProposalData } from '../../interfaces/DataInterface';
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
  }

  async componentDidMount() {

    if (this.props.poll && this.props.web3Interface) {
      await this.getProposalDataFromInterface(null);
      //TODO: how to check high level if it is enabled without destroying UX
      await this.props.web3Interface.initAccounts()
      let accounts = await this.props.web3Interface.web3.eth.getAccounts()
      this.setState({
        activeMetamaskAccount: accounts[0]
      })
    }
  }

  async getProposalDataFromInterface(oldProposals) {
    const proposals = await getProposalData(this.props.web3Interface, this.props.poll.proposalIds, this.state.coinSliderValue, this.state.gasSliderValue, this.state.devSliderValue, this.state.minerSliderValue, oldProposals)
    this.setState({
      proposals: proposals,
      pageLoaded: true,
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

  render() {
    return (
      <div>
      {this.state.pageLoaded ? <section className="section">
        <div className="container has-gutter-top-bottom has-text-centered">
            <div className="title">{this.props.poll.title}</div>
            <div className="subtitle">{this.props.poll.description}</div>
            <div>created by {this.props.poll.author}</div> 
            <div className="title is-4">{new Date(this.props.poll.startDate * 1000).toLocaleDateString()}  -  {new Date(this.props.poll.endDate * 1000).toLocaleDateString()}</div>
            <div className="title is-5">{this.props.poll.votes} Votes</div>

            {this.props.poll.author === this.state.activeMetamaskAccount && this.props.poll.endDate > Date.now() / 1000 ? <button className="button is-link" onClick={this.handleButtonAdminFunctionsOnClick}>Admin functions</button> : null}
            {this.state.showModal ? <SinglePollAdminFunctions handleButtonAdminFunctionsOnClick={this.handleButtonAdminFunctionsOnClick} isStandardPoll={this.props.poll.standardPoll} web3Interface={this.props.web3Interface} pollId={this.props.poll.id} /> : null}

            <section className="section">
            {this.state.proposals.map((proposal) => <SinglePollProposal proposalData={proposal} key={proposal.name} pollId={this.props.poll.id} endDate={this.props.poll.endDate} pollContractAddress={this.props.web3Interface.contractAddress} web3Interface={this.props.web3Interface} />)}
            </section>
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
                                <div className="column"> Gas </div>
                                <div className="column is-8 no-padding">
                                    <SinglePollSlider currentValue={this.state.gasSliderValue} onSliderChange={(e) => this.onGasSliderChange(e)}/>
                                </div>
                                <div className="column is-tablet is-2"/>
                            </div>
                            <div className="columns is-vcentered">
                                <div className="column"> Coins </div>
                                <div className="column is-8 no-padding">
                                    <SinglePollSlider currentValue={this.state.coinSliderValue} onSliderChange={(e) => this.onCoinSliderChange(e)}/>
                                </div>
                                <div className="column is-tablet is-2"/>
                            </div>
                            <div className="columns is-vcentered">
                                <div className="column"> Dev </div>
                                <div className="column is-8 no-padding">
                                    <SinglePollSlider currentValue={this.state.devSliderValue} onSliderChange={(e) => this.onDevSliderChange(e)}/>
                                </div>
                                <div className="column is-tablet is-2"/>
                            </div>
                            <div className="columns is-vcentered">
                                <div className="column"> Miner </div>
                                <div className="column is-8 no-padding">
                                    <SinglePollSlider currentValue={this.state.minerSliderValue} onSliderChange={(e) => this.onMinerSliderChange(e)}/>
                                </div>
                                <div className="column is-tablet is-2"/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
      </section> : <section className="hero is-fullheight is-light">
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