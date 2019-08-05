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