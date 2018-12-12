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
import HeaderBrand from './HeaderBrand.js';

class Header extends Component {

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
          </div>
        </nav>
      </header>
      );
  }
}

export default Header;