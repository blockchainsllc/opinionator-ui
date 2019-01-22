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
import PollCollectionSinglePollLandingPage from '../PollCollection/PollCollectionSinglePollLandingPage'

class SearchEntered extends Component {
  render() {
    return (<div className="section container has-gutter-top-bottom">
    <h1 className="title is-3 ">Search Result</h1>
    <hr className="hr-page-breaker"/>
    <div className="tile is-ancestor tile-flexwrap">
        {this.props.polls.map((poll) => (<PollCollectionSinglePollLandingPage key={poll.id} pollData={poll}/>))}

    </div>
</div>)
  }
}

export default SearchEntered;