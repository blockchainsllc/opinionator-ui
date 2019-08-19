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
      await window['ethereum'].enable();

      if(await this.props.web3Interface.web3.eth.net.getId() === 1)
        alert("You are not mainnet. It might take a while.")
        
      await createPoll(this.props.web3Interface, this.state.inputName, this.state.inputDescription, startDate, endDate, 0, this.state.inputYesNo)
      
      this.setState({
        inputName: '',
        inputDescription: '',
        inputStartDate: '',
        inputEndDate: '',
        inputYesNo: false,
        buttonCreateActive: false
      })

      this.props.history.push('/')

    } catch (error) {
      alert("Something went wrong with your transaction\n" + error)
    }
  }

  render() {
    return (
      <form className="box">
      <label className="label is-large">Create Poll</label>
            <div className='field'>
                <label className="label">Name</label>
                <div className="control has-icon-left">
                    <input className="input" type='text' placeholder='Enter poll name' maxLength='20' value={this.state.inputName} onChange={this.handleInputName} disabled={this.state.buttonCreateActive} required/>
                </div>
            </div>

            <div className='field'>
                <label className="label">Description</label>
                <div>
                    <textarea className="textarea has-fixed-size" type='text' placeholder='Enter poll description' value={this.state.inputDescription} onChange={this.handleInputDescription} disabled={this.state.buttonCreateActive}/>
                </div>
            </div>

            <div className='field'>
                <label className="label">Start Date</label>
                <div>
                    <input className="input" type='datetime-local' placeholder='Enter timestamp' value={this.state.inputStartDate} onChange={this.handleInputStartDate} disabled={this.state.buttonCreateActive}/>
                </div>
            </div>

            <div className='field'>
                <label className="label">End Date</label>
                <div>
                    <input className="input" type='datetime-local' placeholder='Enter timestamp' value={this.state.inputEndDate} onChange={this.handleInputEndDate} disabled={this.state.buttonCreateActive}/>
                </div>
            </div>

            <div className="field">
                <label className="checkbox">
                    <input type="checkbox" value={this.state.inputYesNo} onChange={this.handleInputYesNo} disabled={this.state.buttonCreateActive}/> Standard Yes/No Poll
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