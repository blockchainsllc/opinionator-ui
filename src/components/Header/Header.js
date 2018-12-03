import React, { Component } from 'react';
import HeaderBrand from './HeaderBrand.js';

class Header extends Component {

  constructor(props) {
    super(props);
  }

  async activateMetamaskAccounts() {
    await this.props.web3Interface.initAccounts()
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
                <a className="navbar-item" href="/search">Search</a>

            </div>
            <div className="navbar-end">
                <a className="navbar-item" onClick={this.activateMetamaskAccounts} >Metamask</a>
            </div>
          </div>
        </nav>
      </header>
      );
  }
}

export default Header;