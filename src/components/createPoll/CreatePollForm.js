import React, { Component } from 'react';

class CreatePollForm extends Component {
  render() {
    return (
      <form className="box">
      <label className="label is-large">Create Poll</label>
            <div className='field'>
                <label className="label">Name</label>
                <div className="control has-icon-left">
                    <input className="input" type='text' placeholder='Enter poll name' maxLength='20' required/>
                </div>
            </div>

            <div className='field'>
                <label className="label">Description</label>
                <div>
                    <textarea className="textarea" type='text' placeholder='Enter poll description' />
                </div>
            </div>

            <div className='field'>
                <label className="label">Start Date</label>
                <div>
                    <input className="input" type='datetime-local' placeholder='Enter timestamp' />
                </div>
            </div>

            <div className='field'>
                <label className="label">End Date</label>
                <div>
                    <input className="input" type='datetime-local' placeholder='Enter timestamp' />
                </div>
            </div>

            <div className="field">
                <label className="checkbox">
                    <input type="checkbox" required/> Standard Yes/No Poll
                </label>
            </div>

            <div className="field is-grouped is-grouped-right">
            <div className="control is-grouped">
                <button className="button is-light">
                    Cancel
                </button>

                <button className="button is-link">
                    Create
                </button>
                </div>
            </div>
        </form>
      );
  }
}

export default CreatePollForm;