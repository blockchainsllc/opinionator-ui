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