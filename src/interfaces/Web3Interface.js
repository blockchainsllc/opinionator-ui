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


import config from '../config.json';
import VotingContract from './ContractAbi.json'

const Web3 = require('web3');

//A web3 interface class that contains the votingcontract object and the web3 object
export default class Web3Service {
  //web3;
  //contract;
  constructor() {
    if (typeof window.ethereum !== 'undefined'
    || (typeof window.web3 !== 'undefined')) {
      this.web3 = new Web3(window['ethereum'] || window.web3.currentProvider)
    } else {
      this.web3 = new Web3(config.remoteProvider)
    }

    this.contract = new this.web3.eth.Contract(VotingContract, config.contractAddress)
    this.contractAddress = config.contractAddress

    this.state = {
      initialized: false
    }
    this.initAccounts = this.initAccounts.bind(this)
  }

  //necessary so that metamask allows use of accounts
  async initAccounts() {
    if (window['ethereum']) {
      try {
        //returns the active address
        await window['ethereum'].enable()
      } catch (error) {}
    }


  }
}

/*
export default class Web3Service {
  //web3;
  //contract;
  constructor() {
    if (window['web3'])
      this.web3 = new Web3(window['web3'].currentProvider);
    else
      this.web3 = new Web3("https://tobalaba-rpc.slock.it")
    this.contract = new this.web3.eth.Contract(VotingContract, config.contractAddress)
  }
}


      try {
        await window['ethereum'].enable()
        this.contract = new this.web3.eth.Contract(VotingContract, config.contractAddress)
      } catch (error) {
        this.contract = new this.web3.eth.Contract(VotingContract, config.contractAddress)
      }
*/