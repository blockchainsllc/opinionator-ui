import React, { Component } from 'react';
import PollCollectionSinglePollLandingPage from './PollCollectionSinglePollLandingPage'
import '../styles/PollCollection.css'


class PollCollection extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  getTopPolls() {
    let max1 = this.props.polls[0],
      max2 = this.props.polls[0],
      max3 = this.props.polls[0];

    for (let i = 1, len = this.props.polls.length; i < len; i++) {
      let v = this.props.polls[i].votes;

      if (v > max1.votes)
        max1 = this.props.polls[i];
      else if (v > max2.votes)
        max2 = this.props.polls[i];
      else if (v > max3.votes)
        max3 = this.props.polls[i];
    }

    return [max1, max2, max3];
  }

  render() {

    const maxPolls = this.getTopPolls()

    return (
      <div>
        <div className="section container has-gutter-top-bottom">
            <h1 className="title is-2 has-text-centered">Top Polls</h1>

            <div className="tile is-ancestor tile-flexwrap">
                {maxPolls[0] !== undefined ? maxPolls.map((poll) => (<PollCollectionSinglePollLandingPage key={poll.id} pollData={poll}/>)) : null}
            </div>
        </div>

        <div className="section container has-gutter-top-bottom">
            <h1 className="title is-2 has-text-centered">All Polls</h1>

            <div className="tile is-ancestor tile-flexwrap">
                {this.props.polls.map((poll) => (<PollCollectionSinglePollLandingPage key={poll.id} pollData={poll}/>))}
                { /** 2 empty "invisible" tiles to prevent weird stretching */ }
                <div className="tile is-parent">
                    <div className="tile is-child"></div>
                </div>
                <div className="tile is-parent">
                    <div className="tile is-child"></div>
                </div>
            </div>
        </div>
    </div>
      );
  }
}

export default PollCollection;