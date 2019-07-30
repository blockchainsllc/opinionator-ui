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
import { createPoll } from '../../interfaces/DataInterface'

class CreatePollForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inputName: '',
      inputDescription: '',
      inputStartDate: '',
      inputEndDate: '',
      inputYesNo: false,
      buttonCreateActive: false
    };

    this.handleInputName = this.handleInputName.bind(this);
    this.handleInputDescription = this.handleInputDescription.bind(this);
    this.handleInputStartDate = this.handleInputStartDate.bind(this);
    this.handleInputEndDate = this.handleInputEndDate.bind(this);
    this.handleInputYesNo = this.handleInputYesNo.bind(this);
    this.handleButtonCreatePollClicked = this.handleButtonCreatePollClicked.bind(this);
  }

  handleInputName(event) {
    this.setState({
      inputName: event.target.value
    })
  }

  handleInputDescription(event) {
    this.setState({
      inputDescription: event.target.value
    })
  }

  handleInputStartDate(event) {
    this.setState({
      inputStartDate: event.target.value
    })
  }

  handleInputEndDate(event) {
    this.setState({
      inputEndDate: event.target.value
    })
  }

  handleInputYesNo() {
    this.setState({
      inputYesNo: !this.state.inputYesNo
    })
  }

  async handleButtonCreatePollClicked() {
    this.setState({
      buttonCreateActive: true
    })
    let startDate;
    if (this.state.inputStartDate === '')
      startDate = new Date()
    else
      startDate = this.state.inputStartDate

    let endDate;
    if (this.state.inputEndDate === '')
      endDate = 0
    else
      endDate = this.state.inputEndDate

    try {
      // get metamask access
      await this.props.web3Interface.initAccounts();
      
      await createPoll(this.props.web3Interface, this.state.inputName, this.state.inputDescription, startDate, endDate, 0, this.state.inputYesNo)
    } catch (error) {
      alert("Something went wrong with your transaction\n" + error)
    }

    this.setState({
      inputName: '',
      inputDescription: '',
      inputStartDate: '',
      inputEndDate: '',
      inputYesNo: false,
      buttonCreateActive: false
    })
  }

  render() {
    return (
      <form className="box">
      <label className="label is-large">Create Poll</label>
            <div className='field'>
                <label className="label">Name</label>
                <div className="control has-icon-left">
                    <input className="input" type='text' placeholder='Enter poll name' maxLength='20' value={this.state.inputName} onChange={this.handleInputName} required/>
                </div>
            </div>

            <div className='field'>
                <label className="label">Description</label>
                <div>
                    <textarea className="textarea" type='text' placeholder='Enter poll description' value={this.state.inputDescription} onChange={this.handleInputDescription}/>
                </div>
            </div>

            <div className='field'>
                <label className="label">Start Date</label>
                <div>
                    <input className="input" type='datetime-local' placeholder='Enter timestamp' value={this.state.inputStartDate} onChange={this.handleInputStartDate}/>
                </div>
            </div>

            <div className='field'>
                <label className="label">End Date</label>
                <div>
                    <input className="input" type='datetime-local' placeholder='Enter timestamp' value={this.state.inputEndDate} onChange={this.handleInputEndDate}/>
                </div>
            </div>

            <div className="field">
                <label className="checkbox">
                    <input type="checkbox" value={this.state.inputYesNo} onChange={this.handleInputYesNo}/> Standard Yes/No Poll
                </label>
            </div>

            <div className="field is-grouped is-grouped-right">
            <div className="control is-grouped">
                <button className={!this.state.buttonCreateActive ? "button is-link" : "button is-link is-loading"} onClick={this.handleButtonCreatePollClicked} type="button" disabled={this.state.buttonCreateActive}>
                    Create
                </button>
                </div>
            </div>
        </form>
      );
  }
}

export default CreatePollForm;