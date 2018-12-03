import React, { Component } from 'react';
import SinglePollProposal from './SinglePollProposal';
import SinglePollPieChart from './SinglePollPieChart';
import SinglePollSlider from './SinglePollSlider';
import { getProposalData } from '../../interfaces/DataInterface';
import '../styles/SinglePoll.css'

class SinglePoll extends Component {
  constructor(props) {
    super(props); //@dev {this.props.pollId}
    this.state = {
      poll: null,
      proposals: [],
      pageLoaded: false,

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
  }

  async componentDidMount() {

    if (this.props.poll && this.props.web3Interface) {
      await this.getProposalDataFromInterface(null);
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

  render() {
    return (
      <div>
      {this.state.pageLoaded ? <section className="section">
        <div className="container has-gutter-top-bottom has-text-centered">
            <div className="title">{this.props.poll ? this.props.poll.title : "Title"}</div>
            <div className="subtitle">{this.props.poll ? this.props.poll.description : "Description"}</div>
            <div>created by {this.props.poll ? this.props.poll.author : "Author"}</div> 
            <div className="title is-4">{this.props.poll ? new Date(this.props.poll.startDate * 1000).toLocaleDateString() : "startDate"}  -  {this.props.poll ? new Date(this.props.poll.endDate * 1000).toLocaleDateString() : "endDate"}</div>
            <div className="title is-5">{this.props.poll ? this.props.poll.votes : 0} Votes</div>
            <section className="section">
            {this.state.proposals ? this.state.proposals.map((proposal) => <SinglePollProposal proposalData={proposal} key={proposal.name} pollId={this.props.pollId} endDate={this.props.poll.endDate}/>) : null}
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
      </section> : <div>Loading</div>}
      </div>
      );
  }
}

export default SinglePoll;