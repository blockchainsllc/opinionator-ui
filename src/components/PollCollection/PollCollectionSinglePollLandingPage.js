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
import { Link } from 'react-router-dom';
import '../styles/PollCollectionSinglePollLandingPage.css'

class PollCollectionSinglePollLandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div className="tile is-parent">
        <div className="tile is-child button">
                <Link to={{
        pathname: '/collection/' + this.props.pollData.id
      }}>
                <div className="title is-3 top-gutter">{this.props.pollData.title}</div>
            
            <div className="title is-5 bottom-gutter has-text-grey">votes: {this.props.pollData.votes.length}</div>
            </Link>
        </div>
      </div>
      );
  }
}

export default PollCollectionSinglePollLandingPage;