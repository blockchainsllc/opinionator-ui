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
            <h1 className="title is-2 has-text-centered">Top Polls</h1>

            <div className="tile is-ancestor tile-flexwrap">
            { /** TODO: Have to think about that, at least it works for now */ }
                {maxPolls[0] !== undefined ? maxPolls.filter((poll) => {
        if (poll) return poll
      }).map((poll) => ( <PollCollectionSinglePollLandingPage key={poll.id} pollData={poll}/>)) : null}
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