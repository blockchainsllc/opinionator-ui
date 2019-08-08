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
import CreatePollForm from './CreatePollForm';
import CreatePollNoMetamask from './CreatePollNoMetamask';
class CreatePoll extends Component {
  render() {
    return (
      <section className="hero is-fullheight is-light">
          <div className="hero-body">
            <div className="container">
              <div className="columns is-centered">
                <div className="column is-5-tablet is-6-desktop is-7-widescreen">
                  {(typeof window.ethereum !== 'undefined' || (typeof window.web3 !== 'undefined'))?<CreatePollForm web3Interface={this.props.web3Interface} history={this.props.history}/>:<CreatePollNoMetamask/>}
                </div>
              </div>
            </div>
          </div>
        </section>
      );
  }
}

export default CreatePoll;