//
// This file is part of voting-ui-new.
// 
// It is subject to the terms and conditions defined in
// file 'LICENSE.', which is part of this source code package.
//
// @author Jonas Bentke 
// @version 0.1
// @copyright 2018 by Slock.it GmbH
//

import React, { Component } from 'react';
import Logo from './../../assets/White_Logo.svg';

class HeaderBrand extends Component {
  toggleBurgerMenu() {
    let toggle = document.querySelector(".navbar-burger");
    let menu = document.querySelector(".navbar-menu");
    toggle.classList.toggle("is-active"); menu.classList.toggle("is-active");
  }
  render() {
    return (
      <div className="navbar-brand">
                <a className="navbar-item" href="https://slock.it">
                    <img src={Logo} alt="logo" style={{
        height: '30px'
      }}/>
                </a>
                <div className="navbar-burger burger" onClick={this.toggleBurgerMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
      );
  }
}

export default HeaderBrand;