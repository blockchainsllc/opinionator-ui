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

import React, { Component } from 'react'
import { createProposal } from '../../interfaces/DataInterface'

class SinglePollAdminFunctions extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      inputName: '',
      inputDescription: '',
      buttonCreateActive: false
    })

    this.handleChangeInputName = this.handleChangeInputName.bind(this);
    this.handleChangeInputDescription = this.handleChangeInputDescription.bind(this);
    this.handleButtonCreateProposalClicked = this.handleButtonCreateProposalClicked.bind(this);
  }

  handleChangeInputName(event) {
    this.setState({
      inputName: event.target.value
    })
  }

  handleChangeInputDescription(event) {
    this.setState({
      inputDescription: event.target.value
    })
  }

  async handleButtonCreateProposalClicked() {
    this.setState({
      buttonCreateActive: true
    })
    await createProposal(this.props.web3Interface, this.state.inputName, this.state.inputDescription, this.props.pollId)
    this.setState({
      buttonCreateActive: false
    })
    this.props.handleButtonAdminFunctionsOnClick()
  }

  render() {
    return <div>
      { /** I am using the modal here kinda wrong. Instead I should depending on the state change the className as seen in the create button */ }
            <div className="modal is-active">
              <div className="modal-background"></div>
              <div className="modal-content">
                <div className="box">
                  {this.props.isStandardPoll ? <p>This is a standard Yes/No Poll. Nothing you can do here.</p> : <div>
                    <div className="title is-5">Create Proposal</div>

                    <div className='field'>
                        <label className="label">Name</label>
                        <div className="control has-icon-left">
                            <input className="input" type='text' placeholder='Enter proposal name' maxLength='20' value={this.state.inputName} onChange={this.handleChangeInputName} required/>
                        </div>
                    </div>

                    <div className='field'>
                        <label className="label">Description</label>
                        <div className="control has-icon-left">
                            <input className="textarea" type='text' placeholder='Enter description' maxLength='50' value={this.state.inputDescription} onChange={this.handleChangeInputDescription}/>
                        </div>
                    </div>

                    <div className="field is-grouped is-grouped-right">
                      <div className="control is-grouped">
                          <button className={!this.state.buttonCreateActive ? "button is-link" : "button is-link is-loading"} onClick={this.handleButtonCreateProposalClicked} type="button" disabled={this.state.buttonCreateActive}>
                              Create
                          </button>
                      </div>
                    </div>

                  </div>}
                </div>
              </div>
              <button className="modal-close is-large" aria-label="close" onClick={this.props.handleButtonAdminFunctionsOnClick} ></button>
            </div>
        </div>
  }
}

export default SinglePollAdminFunctions;