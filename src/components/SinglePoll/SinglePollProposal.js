import React, { Component } from 'react';
import "../styles/SinglePollProposal.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPercentage, faGasPump, faCoins, faCogs, faCubes, faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'

class SinglePollProposal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    }

    this.handleClickOnProposalBox = this.handleClickOnProposalBox.bind(this)
    this.handleClickOnSendSignatureButton = this.handleClickOnSendSignatureButton.bind(this)
  }

  handleClickOnProposalBox() {
    this.setState({
      expanded: !this.state.expanded && parseInt(this.props.endDate) > parseInt(Date.now().toString().substring(0, 10))
    });
  }

  getMessage() {
    return JSON.stringify({
      pollContractAddress: "0x0",
      poll_id: this.props.pollId,
      proposal_id: this.props.proposalData.id
    })
  }

  handleClickOnSendSignatureButton() {}

  render() {

    const loadingScreen = <div></div>
    const message = this.getMessage()
    return (
      <div>
        {!this.props.proposalData ? loadingScreen :
        <div className="box proposalBox-buttom-spacer" >
            <div className="columns">
                <div className="column has-text-left is-2">
                    <div className="title is-5">{this.props.proposalData.name}</div>
                </div>
                <div className="column has-text-left">
                    <div>{this.props.proposalData.description}</div>
                </div>
                <div className="column has-text-right">
                    {this.state.expanded ? <FontAwesomeIcon icon={faAngleUp} onClick={this.handleClickOnProposalBox}/> : <FontAwesomeIcon icon={faAngleDown} onClick={this.handleClickOnProposalBox}/>}
                </div>
            </div>
            <div className="columns">

                <div className="column">
                    <FontAwesomeIcon icon={faPercentage} /> 
                    {this.props.proposalData.percentage}
                </div>
                <div className="column">
                    <FontAwesomeIcon icon={faGasPump} /> 
                    {this.props.proposalData.gas}
                </div>
                <div className="column">
                    <FontAwesomeIcon icon={faCoins} /> 
                    {this.props.proposalData.coin}
                </div>
                <div className="column">
                    <FontAwesomeIcon icon={faCogs} /> 
                    {this.props.proposalData.dev}
                </div>
                <div className="column">
                    <FontAwesomeIcon icon={faCubes} /> 
                    {this.props.proposalData.miner}
                </div>
            </div>

            <div className="columns">
                <div className="column has-text-right">
                    <progress className="progress is-link" value={this.props.proposalData.percentage} max="100"/>
                </div>
            </div>

            { /** Form for signing */ }
            {!this.state.expanded ? null :

          <div className="section">

            <div className='field'>
                <div className="control has-icon-left">
                <label className="label">Your Address</label>
                    <input className="input" type='text' placeholder='Enter your address' required/>
                </div>
            </div>

            <div className='field'>
                <div className="control has-icon-left">
                <label className="label">The message to vote on</label>
                    <input className="input is-disabled" type='text' value={message} readOnly={true}/>
                </div>
            </div>

            <div className='field'>
                <div className="control has-icon-left">
                <label className="label">Paste signature here</label>
                    <input className="input proposalBox-buttom-spacer" type='text' placeholder='Enter your Signature' required/>
                </div>
            </div>

            {<button className="button is-left is-link" onClick={this.handleClickOnSendSignatureButton}>Send Signature</button>}

            </div>}
        </div>
      }
      </div>
      );
  }
}

export default SinglePollProposal;