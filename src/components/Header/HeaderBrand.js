import React, { Component } from 'react';
import Logo from './../../assets/White_Logo.svg';

class HeaderBrand extends Component {
  render() {
    return (
      <div className="navbar-brand">
                <a className="navbar-item" href="https://slock.it">
                    <img src={Logo} alt="logo" style={{
        height: '30px'
      }}/>
                </a>
                <div className="navbar-burger burger">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
      );
  }
}

export default HeaderBrand;