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

import React, { Component } from 'react'

class SinglePollProposalInfoModal extends Component {

  render() {
    return <div>
            <div className="modal is-active">
              <div className="modal-background"></div>
              <div className="modal-content">
                <div className="box">
                    <section>
                        <div className="title">Message Signing</div>
                        <div>To sign your vote, copy the message from the box and sign it with your private key. 
                            If you know how to do it great! If not its very simple. Just visit <a target="_blank" rel="noopener noreferrer" href="https://vintage.myetherwallet.com/signmsg.html">myetherwallet.com </a> 
                             and paste the message there. Then choose how to sign it with one of the given methods. As soon as it is sign, copy the "signature" part
                             from the result and paste it here. And all done!</div>
                    </section>
                </div>
              </div>
              <button className="modal-close is-large" aria-label="close" onClick={this.props.handleClickInfoButtonSignature} ></button>
            </div>
        </div>
  }
}

export default SinglePollProposalInfoModal;