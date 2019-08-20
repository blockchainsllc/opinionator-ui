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
import config from '../../config.json';
import contractABI from '../../interfaces/ContractAbi.json'

class CreatePollNoMetamask extends Component {
    render(){
        return(
        <div className="content">
            <h1>No Metamask active</h1>
            <p>If you want to do it yourself, here are the infos you are looking for:</p>
            <p>Contract address: {config.contractAddress}</p>

            <p className="control">
                <input className="input" type="text" value={JSON.stringify(contractABI)} readOnly/>
            </p>
            <p>The function you are looking for:</p>
            <h6 className="is-family-monospace">createPoll(name, description, startDate, endDate, votingChoice, standardPoll)</h6>
                    <ul className="is-family-monospace">
                        <li>name: the name of your poll</li>
                        <li>description: the description for your poll, can also just be a link</li>
                        <li>startDate: a unix timestamp</li>
                        <li>endDate: a unix timestamp (0 if it should never end)</li>
                        <li>votingChoice: just put 0 here for now</li>
                        <li>standardPoll: trust me, its easier to put true here</li>
                    </ul>
                <p>For advanced option and the contract code you can also go and see <a href="https://github.com/slockit">here</a>.</p>
        </div>
        )
    }
}

export default CreatePollNoMetamask;