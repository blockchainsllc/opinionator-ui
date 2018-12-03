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
                <div className="title is-4 top-gutter">{this.props.pollData.title}</div>
            
            <div className="title is-1 bottom-gutter">{this.props.pollData.votes}</div>
            </Link>
        </div>
      </div>
      );
  }
}

export default PollCollectionSinglePollLandingPage;