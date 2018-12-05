import React, { Component } from 'react';
import HeaderBrand from './HeaderBrand.js';

class Header extends Component {

  constructor(props) {
    super(props);

    this.activateMetamaskAccounts = this.activateMetamaskAccounts.bind(this)
  }

  async activateMetamaskAccounts() {
    //TODO: That is so weird that its not kinda working. Need to test what is actually used (remote node or metamask)
    if (!this.props.web3Interface.initialized)
      await this.props.web3Interface.initAccounts()
    else
      alert("You already approved Metamask")
  }

  render() {
    return (
      <header>
        <nav className="navbar is-link" role="navigation" aria-label="main navigation">
          <HeaderBrand />

          <div className="navbar-menu">
            <div className="navbar-start">
              
                <a className="navbar-item" href="/">Home</a>
                <a className="navbar-item" href="/createPoll">Create</a>
                { /**<a className="navbar-item" href="/search">Search</a> */ }

            </div>
            <div className="navbar-end">
                <a className="navbar-item" onClick={this.activateMetamaskAccounts}>Metamask</a>
            </div>
          </div>
        </nav>
      </header>
      );
  }
}

export default Header;