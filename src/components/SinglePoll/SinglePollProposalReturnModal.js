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
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

class SinglePollProposalReturnModal extends Component {

    constructor(props) {
        super(props);
        this.clickDownloadButton = this.clickDownloadButton.bind(this)
      }

    clickDownloadButton(Response) {
        var dd = {
            content: [
                {
                    text: 'You signed vote',
                    style: 'header'
                },
                Response
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true
                },
                subheader: {
                    fontSize: 15,
                    bold: true
                },
                quote: {
                    italics: true
                },
                small: {
                    fontSize: 8
                }
            }
        }
        pdfMake.createPdf(dd).download();
    }


  render() {
    return <div>
            <div className="modal is-active">
              <div className="modal-background"></div>
              <div className="modal-content">
                <div className="box">
                    <section>
                        <div className="title">Voting Successfull</div>
                        <div>Thank you for participating! For your safety we signed your vote so you can know that we have it. klick <a onClick={this.clickDownloadButton} style="cursor: pointer; cursor: hand;">here</a> to download the pdf.</div>
                    </section>
                </div>
              </div>
              <button className="modal-close is-large" aria-label="close" onClick={this.props.handleCloseReturnModal} ></button>
            </div>
        </div>
  }
}

export default SinglePollProposalReturnModal;