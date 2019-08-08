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