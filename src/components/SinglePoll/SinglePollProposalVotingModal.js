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
import { sendVote } from '../../interfaces/DatabaseInterface'
import ReactTooltip from 'react-tooltip'
import "../styles/SinglePollProposal.css"
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
pdfMake.vfs = pdfFonts.pdfMake.vfs;

class SinglePollProposalVotingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
          inputAddress: '',
          inputSignature: '',
          inputAddressColor: '',
          inputSignatureColor: '',
          returnedSignature: '',
          metamaskEnabled: false,
          votingModalStage: 1,
          selectedProposal: '',
          selectedSigningMethod: 'with Metamask'

        }
    
        this.handleAddressChange = this.handleAddressChange.bind(this)
        this.handleSignatureChange = this.handleSignatureChange.bind(this)
        this.handleClickOnSendSignatureButton = this.handleClickOnSendSignatureButton.bind(this)
        this.handleMetamaskSignButton = this.handleMetamaskSignButton.bind(this)
        this.handleClickNextStageButton = this.handleClickNextStageButton.bind(this)
        this.handleClickBackStageButton = this.handleClickBackStageButton.bind(this)
        this.handleSelectSigningMethod = this.handleSelectSigningMethod.bind(this)
        this.handleSelectProposal = this.handleSelectProposal.bind(this)
        this.clickDownloadButton = this.clickDownloadButton.bind(this)
    }

    componentDidMount() {
        if (typeof window.ethereum !== 'undefined' || (typeof window.web3 !== 'undefined')){
          this.setState({
            metamaskEnabled: true
          })
        }
        this.setState({
            selectedProposal: this.props.proposalData[0].name
        })
    }
    
    getMessage() {
        return JSON.stringify({
          pollContractAddress: this.props.pollContractAddress,
          poll_id: this.props.pollId,
          proposal_id: (this.props.proposalData.find(element => element.name === this.state.selectedProposal)||{}).id
        })
    }

    handleSignatureChange(event) {
        this.setState({
          inputSignature: event.target.value
        })
    }
    
    handleAddressChange(event) {
    if(event.target.value.length !== 42 || event.target.value[0] !== "0" || event.target.value[1] !== "x")
        this.setState({
          inputAddress: event.target.value,
          inputAddressColor: "is-danger"
        })
        else{
          this.setState({
            inputAddress: event.target.value,
            inputAddressColor: ""
          })
        }
    }

    async handleClickOnSendSignatureButton() {
        let signatureMatches = await this.checkSignature()
        if (signatureMatches) {
          try {
            let response = await sendVote({
              message: this.getMessage(),
              version: '0.1',
              signature: this.state.inputSignature
            })
          
            this.setState({
              inputAddress: '',
              inputSignature: '',
              returnedSignature: response,
              votingModalStage: 3,
            })
          } catch (error) {
            //show notification
            alert("Error: You already participated. Please try another address\n" + error)
          }
        } else {
          //show notification
          this.setState({
            inputSignatureColor: 'is-danger'
          })
        }
    }
    
      async checkSignature() {
        let returnValue = false
        try {
          returnValue = await this.props.web3Interface.web3.eth.personal.ecRecover(this.getMessage(), this.state.inputSignature)
        } catch (error) {
          //show notification
          alert("Error: " + error)
        }
        
        if(returnValue.toLowerCase() === this.state.inputAddress.toLowerCase())
          return true
        else
          return false
      }
    
      async handleMetamaskSignButton() {
        const ethAddress = (await this.props.web3Interface.web3.eth.getAccounts())[0]
        const message = this.getMessage()
        const result = await this.props.web3Interface.web3.eth.personal.sign(message, ethAddress)
    
        try {
          let response = await await sendVote({
            message: message,
            version: '0.1',
            signature: result
          })
          this.setState({
            inputAddress: '',
            inputSignature: '',
            returnedSignature: response,
            votingModalStage: 3,
          })
        } catch (error) {
          //show notification
          alert("Error: You already participated. Please try another address\n" + error)
        }
    }

    handleClickNextStageButton() {
        this.setState({
            votingModalStage: 2
        })
    }

    handleClickBackStageButton() {
        this.setState({
            votingModalStage: 1
        })
    }

    handleSelectProposal(event) {
        this.setState({
            selectedProposal: event.target.value,
        })
    }

    handleSelectSigningMethod(event) {
        this.setState({
            selectedSigningMethod: event.target.value,
        })
    }

    clickDownloadButton() {
        var dd = {
            content: [
                {
                    text: 'Your signed vote',
                    style: 'header'
                },
                JSON.stringify(this.state.returnedSignature)
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true
                },
                subheader: {
                    fontSize: 15,
                    bold: true
                },
                quote: {
                    italics: true
                },
                small: {
                    fontSize: 8
                }
            }
        }
        pdfMake.createPdf(dd).download();
    }

    render() {
        const message = this.getMessage()

        let output;

        switch(this.state.votingModalStage) {
            case 1:
                output = <div>
                <section className="modal-card-body">

                  <div className="container">
                  <label className="label">Choose the proposal you want to vote on:</label>
                  <div className="select">
                      <select onChange={this.handleSelectProposal} value={this.state.selectedProposal}>
                          {this.props.proposalData.map((proposal) => <option key={proposal.id}>{proposal.name}</option>)}
                      </select>
                  </div>
                  <div className="container-buttom-spacer"></div>
                  </div>

                  {this.state.metamaskEnabled?
                  <div className="container">
                  <label className="label">How do you want to sign your vote?</label>
                  <div className="select">
                      <select onChange={this.handleSelectSigningMethod}>
                          <option>with Metamask</option>
                          <option>Manual Signing</option>
                      </select>
                  </div>
                  </div>
                  :
                  <div className="container">
                  <div className="select">
                      <select onChange={this.handleSelectSigningMethod}>
                          <option>Manual Signing</option>
                      </select>
                  </div>
                  </div>}
                </section>
                <footer className="modal-card-foot">
                  <button className="button is-success" onClick={this.handleClickNextStageButton}>Next</button>
                  <button className="button" onClick={this.props.handleCloseVotingModal}>Cancel</button>
                </footer>
              </div>
            break;

            case 2:
                output = this.state.selectedSigningMethod === "with Metamask"?
                <div>
                 <section className="modal-card-body">
                      <div className="section">
                        <label className="label">The vote you are signing:</label>
                        <input className="input is-disabled" type='text' value={message} readOnly={true}/>
                      </div>
                  </section>
                  <footer className="modal-card-foot">
                    <button className="button is-link metamaskSign-button-color" onClick={this.handleMetamaskSignButton}>Sign with Metamask</button>
                    <button className="button" onClick={this.handleClickBackStageButton}>back</button>
                  </footer>
                </div>
                :
                <div>
                    <section className="modal-card-body">
                        <div className='field'>
                          <div className="control has-icon-left">
                          <label className="label">Your Address</label>
                              <input className={"input "+this.state.inputAddressColor} type='text' placeholder='Enter your address' onChange={this.handleAddressChange} value={this.state.inputAddress} required/>
                          </div>
                      </div>

                      <div className='field'>
                          <div className="control has-icon-left">
                          <label className="label">The message to vote on <a href="https://vintage.myetherwallet.com/signmsg.html"><FontAwesomeIcon icon={faQuestionCircle} data-tip data-for="signing-help"/></a></label>
                          <ReactTooltip place="top" type="dark" effect="float" id="signing-help">Sign with your private key, click here to use myetherwallet</ReactTooltip>
                          <input className="input is-disabled" type='text' value={message} readOnly={true}/>
                          </div>
                      </div>

                      <div className='field'>
                          <div className="control has-icon-left">
                          <label className="label">Paste signature here</label>
                              <input className={"input proposalBox-buttom-spacer " + this.state.inputSignatureColor} type='text' placeholder='Enter your Signature' value={this.state.inputSignature} onChange={this.handleSignatureChange} required/>
                          </div>
                      </div>

                    </section>
                    <footer className="modal-card-foot">
                      <button className="button is-left is-link" onClick={this.handleClickOnSendSignatureButton}>Sign Manually</button>
                      <button className="button" onClick={this.handleClickBackStageButton}>back</button>
                    </footer>
                </div>
            break;

            case 3:
                output = <div>
                <section className="modal-card-body">
                        <div className="section">
                            <section>
                                <div className="title">Voting Successfull</div>
                                <div>Thank you for participating! For your safety we signed your vote so you can know that we have it. klick <button onClick={this.clickDownloadButton}>here</button> to download the pdf.</div>
                            </section>
                        </div>
                    </section>
                    <footer className="modal-card-foot">
                    <button className="button" onClick={this.props.handleCloseVotingModal}>Close</button>
                    </footer>
                </div>
            break;

            default:
                output = null;
            break;
        }

        return <div>
                <div className="modal is-active">
                  <div className="modal-background"></div>
                  <div className="modal-card">
                  <header className="modal-card-head">
                    <p className="modal-card-title">{this.props.pollTitle}</p>
                    <button className="delete" aria-label="close" onClick={this.props.handleCloseVotingModal}></button>
                  </header>
                    {output}
                  </div>
                </div>
            </div>
      }
}

export default SinglePollProposalVotingModal