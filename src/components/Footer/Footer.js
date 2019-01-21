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
import './../styles/Footer.css'
class Footer extends Component {
  render() {
    return (
      <div className="fix-footer">
            <div className="footer-text">
                <p className="has-text-centered"><a href="https://slock.it/impressum.html">Legal Notice</a> - <a href="https://slock.it/privacy_web.html">Privacy Notice</a> - © Copright 2015-2019 Slock.it GmbH - All Rights Reserved</p>
            </div>
      </div>
      );
  }
}

export default Footer;