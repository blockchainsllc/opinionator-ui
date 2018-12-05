import React, { Component } from 'react';
import CreatePollForm from './CreatePollForm';
class CreatePoll extends Component {
  render() {
    return (
      <section className="hero is-fullheight is-light">
          <div className="hero-body">
            <div className="container">
              <div className="columns is-centered">
                <div className="column is-5-tablet is-6-desktop is-7-widescreen">
                  <CreatePollForm web3Interface={this.props.web3Interface}/>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
  }
}

export default CreatePoll;