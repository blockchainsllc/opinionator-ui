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
import './App.css';
import CreatePoll from './createPoll/CreatePoll.js'
import Header from './Header/Header.js'
import Footer from './Footer/Footer'
import PollCollection from './PollCollection/PollCollection'
import SinglePoll from './SinglePoll/SinglePoll'
import Search from './Search/Search'
import SearchEntered from './Search/SearchEntered'
import { BrowserRouter, Route } from 'react-router-dom';
import { getPoll, getPollAmount } from '../interfaces/DataInterface.js'
import { getAmountOfVotesForPoll } from '../interfaces/DatabaseInterface.js'
import Web3Interface from '../interfaces/Web3Interface.js'
import ErrorBoundary from './ErrorBoundary';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      polls: [],
      web3Interface: new Web3Interface(),
      chainHasPolls: true,
      showWelcomeModal: true,
    };
    this.getPolls = this.getPolls.bind(this)
    this.closeWelcomeModal = this.closeWelcomeModal.bind(this)
  }

  async componentDidMount() {
    //TODO: I really dont like that here, should move it somewhere else
    const pollAmount = await getPollAmount(this.state.web3Interface)
    if(pollAmount === 0) {
      // Triggers a display to suggest to change chains.
      this.setState({chainHasPolls:false});
    }

    //gets one poll every 50ms to not spam the backend
    for (var i = 0; i < pollAmount; i++) {
      this.sleep(this.getPolls, i)
    }
  }

  //allowes to call async functions after a certain time period
  sleep(fn, par) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(fn(par)), 50)
    })
  }

  closeWelcomeModal() {
    this.setState({
      showWelcomeModal: false
    })
  }

  //collects a poll and stores it in the state array for polls
  async getPolls(pollId) {
    var pollObj = await getPoll(this.state.web3Interface, pollId);
    pollObj.votes = (await getAmountOfVotesForPoll(pollId));
    this.setState({
      polls: this.state.polls.concat(pollObj)
    })
  }


  render() {
    return (
      <ErrorBoundary>
        <BrowserRouter>
          <div className="main-container">
            <Header web3Interface={this.state.web3Interface}/>

            {!this.state.chainHasPolls ? <Route exact path="/" render={() => <div style={{margin: '0 auto',width: '50vw',textAlign: 'center'}}>No Polls found on chain. Consider switching to a supported chain (Mainnet or Görli)</div>}></Route> : null}

            <Route exact path="/" render={() => <PollCollection polls={this.state.polls} closeWelcomeModal={this.closeWelcomeModal} welcomeModalState={this.state.showWelcomeModal}/>}/>
            <Route exact path="/createPoll" component={({history}) => <CreatePoll web3Interface={this.state.web3Interface} history={history}/>}/>
            <Route exact path="/collection/:id" component={(props) => <SinglePoll poll={this.state.polls.find(poll => poll.id === parseInt(props.match.params.id))} web3Interface={this.state.web3Interface}/>} />
            <Route exact path="/search" component={({history}) => <Search history={history} />} />
            <Route exact path="/search/:searchString" component={(props) => <SearchEntered polls={this.state.polls.filter((poll) => {
            return poll.title.toLowerCase().includes(props.match.params.searchString.toLowerCase())
            })} />} />
            <Footer/>
          </div>
        </BrowserRouter>
      </ErrorBoundary>
      );
  }
}

export default App;
