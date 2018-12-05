import config from '../config.json';
import VotingContract from './ContractAbi.json'

const Web3 = require('web3');

export default class Web3Service {
  //web3;
  //contract;
  constructor() {
    if (window['ethereum']) {
      this.web3 = new Web3(window['ethereum'])
    } else if (window['web3']) {
      this.web3 = new Web3(config.remoteProvider)
    }

    this.contract = new this.web3.eth.Contract(VotingContract, config.contractAddress)
    this.contractAddress = config.contractAddress

    this.state = {
      initialized: false
    }
    this.initAccounts = this.initAccounts.bind(this)
  }

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