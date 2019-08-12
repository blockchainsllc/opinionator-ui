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
import PollCollectionSinglePollLandingPage from './PollCollectionSinglePollLandingPage'
import PollCollectionWelcomeModal from './PollCollectionWelcomeModal'
import config from '../../config.json';
import '../styles/PollCollection.css'
import PollCollectionWrongNetwork from './PollCollectionWronNetwork';


class PollCollection extends Component {

  constructor(props) {
    super(props);
    this.state = ({
      maxPolls: [],
      netID: 0
    })

    this.handleCloseWelcomeModal = this.handleCloseWelcomeModal.bind(this)
  }

  async componentDidMount() {
    this.setState({
      maxPolls: this.getTopPolls(),
      netID: await this.props.web3Interface.web3.eth.net.getId(),
    })
  }

  handleCloseWelcomeModal() {
    this.props.closeWelcomeModal()
  }

  getTopPolls() {
    var max1 = 0,
      max2 = 0,
      max3 = 0,
      pollMax1,
      pollMax2,
      pollMax3;

    for (let i = 0, len = this.props.polls.length; i < len; i++) {
      let v = this.props.polls[i].votes.length;

      if (v > max1) {
        max1 = v
        pollMax1 = this.props.polls[i];
      } else if (v > max2) {
        max2 = v
        pollMax2 = this.props.polls[i];
      } else if (v > max3) {
        max3 = v
        pollMax3 = this.props.polls[i];
      }

    }

    return [pollMax1, pollMax2, pollMax3];
  }

  render() {

    const maxPolls = this.getTopPolls()

    return (
      <div>
        {(this.state.netID === config.network)?
        <div>
          <div className="section container has-gutter-top-bottom">
              <h1 className="title is-3 ">Top Polls</h1>
              {this.props.welcomeModalState?<PollCollectionWelcomeModal handleCloseWelcomeModal={this.handleCloseWelcomeModal}/>:null}
              <hr className="hr-page-breaker"/>
              <div className="tile is-ancestor tile-flexwrap">
              { /** TODO: Have to think about that, at least it works for now */ }
                  {maxPolls[0] !== undefined ? maxPolls.filter((poll) => {
                    if (poll) return true
                    else return false
                  }).map((poll) => ( <PollCollectionSinglePollLandingPage key={poll.id} pollData={poll}/>)) : null}
              </div>
          </div>

          <div className="section container has-gutter-top-bottom">
              <h1 className="title is-3 ">All Polls</h1>
              <hr className="hr-page-breaker"/>
              <div className="tile is-ancestor tile-flexwrap">
                  {this.props.polls.map((poll) => (<PollCollectionSinglePollLandingPage key={poll.id} pollData={poll}/>))}

              </div>
          </div>
        </div>
        :<PollCollectionWrongNetwork/>}
    </div>
      );
  }
}

export default PollCollection;