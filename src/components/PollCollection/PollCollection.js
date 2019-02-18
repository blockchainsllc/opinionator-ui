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
import PollCollectionSinglePollLandingPage from './PollCollectionSinglePollLandingPage'
import '../styles/PollCollection.css'


class PollCollection extends Component {

  constructor(props) {
    super(props);
    this.state = ({
      maxPolls: []
    })
  }

  componentDidMount() {
    this.setState({
      maxPolls: this.getTopPolls()
    })
  }

  getTopPolls() {
    var max1 = 0,
      max2 = 0,
      max3 = 0,
      pollMax1,
      pollMax2,
      pollMax3;

    for (let i = 0, len = this.props.polls.length; i < len; i++) {
      let v = this.props.polls[i].votes;

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
        <div className="section container has-gutter-top-bottom">
            <h1 className="title is-2 ">Top Polls</h1>
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
            <h1 className="title is-2 ">All Polls</h1>
            <hr className="hr-page-breaker"/>
            <div className="tile is-ancestor tile-flexwrap">
                {this.props.polls.map((poll) => (<PollCollectionSinglePollLandingPage key={poll.id} pollData={poll}/>))}

            </div>
        </div>
    </div>
      );
  }
}

export default PollCollection;