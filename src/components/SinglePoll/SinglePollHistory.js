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

import React, {Component} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGasPump, faCoins, faCogs, faCubes, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import '../styles/SinglePoll.css'

class SinglePollHistory extends Component{
    constructor(props) {
        super(props)
        this.state = {
            showHistory: false,
        }

        this.handleClickHistoryButton = this.handleClickHistoryButton.bind(this)
    }

    handleClickHistoryButton() {
        this.setState({
            showHistory: !this.state.showHistory
        })
    }

    render() {
        return (
            <div>
            {this.state.showHistory?
                <div>
                    <div>
                        <label className="history-text" onClick={this.handleClickHistoryButton}> <FontAwesomeIcon icon={faChevronUp} /> History <FontAwesomeIcon icon={faChevronUp} /> </label>
                    </div>
                    <div className="section">
                        <div className="columns history-column">
                            <div className="column is-1"></div>
                            <div className="column">
                                <p><FontAwesomeIcon icon={faGasPump} /> Gas Voting</p>
                                <p>
                                    Here all gas that was spend on the addresses that voted are counted together.
                                </p>
                            </div>
                            <div className="column">
                                <p><FontAwesomeIcon icon={faCoins} /> Coin Voting</p>
                                <p>
                                    The sum of all ether hold by the voting addresses is shown in units of full eth but calculated on the wei.
                                </p>
                            </div>
                            <div className="column">
                                <p><FontAwesomeIcon icon={faCogs} /> Developer Voting</p>
                                <p>
                                    All gas that someone spend on a contract which was created by on of the voting addresses is counted here.
                                </p>
                            </div>
                            <div className="column">
                                    <p><FontAwesomeIcon icon={faCubes} /> Miner Voting</p>
                                    <p>
                                    Summed difficulty of every block mined by the voting addresses.
                                    </p>
                            </div>
                            <div className="column is-1"></div>
                        </div>
                    </div>
                </div>:
                <div>
                    <div>
                        <label className="history-text" onClick={this.handleClickHistoryButton}> <FontAwesomeIcon icon={faChevronDown} /> History <FontAwesomeIcon icon={faChevronDown} /> </label>
                    </div>
                </div>}
            </div>
        )
    }
}

export default SinglePollHistory;