import React, { Component } from 'react';
import './../styles/Footer.css'
class Footer extends Component {
  render() {
    return (
      <div className="fix-footer">
            <div className="footer-text">
                <p className="has-text-centered"><a href="https://slock.it/impressum.html">Legal Notice</a> - <a href="https://slock.it/privacy_web.html">Privacy Notice</a> - © Copright 2015-2018 Slock.it GmbH - All Rights Reserved</p>
            </div>
      </div>
      );
  }
}

export default Footer;