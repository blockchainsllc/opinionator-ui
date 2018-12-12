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