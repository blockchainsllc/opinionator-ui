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
import "../styles/SinglePollProposal.css"
import ReactTooltip from 'react-tooltip'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPercentage, faGasPump, faCoins, faCogs, faCubes } from '@fortawesome/free-solid-svg-icons'

class SinglePollProposal extends Component {

  render() {

    const loadingScreen = <div></div>

    return (
      <div>
        {!this.props.proposalData ? loadingScreen :
        <div className="box proposalBox-buttom-spacer" >
            <div className="columns">
                <div className="column has-text-left is-2">
                    <div className="title is-5">{this.props.proposalData.name}</div>
                </div>
                <div className="column has-text-left">
                    <div>{this.props.proposalData.description}</div>
                </div>
            </div>
            <div className="columns">

                <div className="column">
                    <FontAwesomeIcon icon={faPercentage} /> 
                    {this.props.proposalData.percentage}
                </div>
                <div className="column">
                    <FontAwesomeIcon icon={faGasPump} data-tip data-for="gas"/> 
                    <ReactTooltip place="top" type="dark" effect="float" id="gas">Amount of gas</ReactTooltip>
                    {this.props.proposalData.gas}
                </div>
                <div className="column">
                    <FontAwesomeIcon icon={faCoins} data-tip data-for="coins"/> 
                    <ReactTooltip place="top" type="dark" effect="float" id="coins">Amount of eth</ReactTooltip>
            { /**slice the last 18 digits to get eth instead of wei (not nice but simple enough (calculation is still accurate, only for display))*/ }
                    {this.props.proposalData.coin !== "0" && this.props.proposalData.coin.toString().length > 18 ? this.props.proposalData.coin.slice(0, -18) : "<1"}
                </div>
                <div className="column">
                    <FontAwesomeIcon icon={faCogs} data-tip data-for="dev"/> 
                    <ReactTooltip place="top" type="dark" effect="float" id="dev">Amount of gas on contracts</ReactTooltip> 
                    {this.props.proposalData.dev}
                </div>
                <div className="column">
                    <FontAwesomeIcon icon={faCubes} data-tip data-for="miner"/> 
                    <ReactTooltip place="top" type="dark" effect="float" id="miner">Total difficulty</ReactTooltip>
                    {this.props.proposalData.miner}
                </div>
            </div>

            <div className="columns">
                <div className="column has-text-right">
                    <progress className="progress is-link" value={this.props.proposalData.percentage} max="100"/>
                </div>
            </div>

        </div>
      }
      </div>
      );
  }
}

export default SinglePollProposal;