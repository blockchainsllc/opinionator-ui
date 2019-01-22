/*
// This file is part of voting-ui-new.
// 
// It is subject to the terms and conditions defined in
// file 'LICENSE.', which is part of this source code package.
//
// @author Jonas Bentke 
// @version 0.1
// @copyright 2018 by Slock.it GmbH
*/

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

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      polls: [],
      web3Interface: new Web3Interface()
    };
    this.getPolls = this.getPolls.bind(this)
  }

  async componentDidMount() {
    //TODO: I really dont like that here, should move it somewhere else
    const pollAmount = await getPollAmount(this.state.web3Interface)

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

  //collects a poll and stores it in the state array for polls
  async getPolls(pollId) {
    var pollObj = await getPoll(this.state.web3Interface, pollId);
    pollObj.votes = (await getAmountOfVotesForPoll(pollId)).length;
    this.setState({
      polls: this.state.polls.concat(pollObj)
    })
  }

  render() {
    return (
      <div className="main-container">
        <Header web3Interface={this.state.web3Interface}/>
        <BrowserRouter>
          <div>
            <Route exact path="/" render={() => <PollCollection polls={this.state.polls}/>}/>
            <Route exact path="/createPoll" render={() => <CreatePoll web3Interface={this.state.web3Interface}/>}/>
            <Route exact path="/collection/:id" component={(props) => <SinglePoll poll={this.state.polls.find(poll => poll.id === parseInt(props.match.params.id))} web3Interface={this.state.web3Interface}/>} />
            <Route exact path="/search" component={({history}) => <Search history={history} />} />
            <Route exact path="/search/:searchString" component={(props) => <SearchEntered polls={this.state.polls.filter((poll) => {
          return poll.title.toLowerCase().includes(props.match.params.searchString.toLowerCase())
        })} />} />
          </div>
        </BrowserRouter>
        <Footer/>
      </div>
      );
  }
}

export default App;
