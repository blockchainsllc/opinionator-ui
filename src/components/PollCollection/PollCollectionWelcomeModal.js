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
import { Waypoint } from 'react-waypoint'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGasPump, faCoins, faCogs, faCubes } from '@fortawesome/free-solid-svg-icons'

class PollCollectionWelcomeModal extends Component{

    constructor(props) {
        super(props)
        this.state = {
            hasScrolled: false,
        }

        this.handleWaypointEnter = this.handleWaypointEnter.bind(this)
    }

    handleWaypointEnter() {
        this.setState({
            hasScrolled: true,
        })
    }


    render() {
        return(
            <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Welcome</p>
                    <button className="delete" aria-label="close" onClick={this.props.handleCloseWelcomeModal}></button>
                </header>
                <section className="modal-card-body">
                    <div className="content">
                        <h3>
                            Welcome to the Opinionator! A few things you need to know before we start:
                        </h3>
                        <ol>
                            <li>We don't store any of your private key information :)</li>
                            <li>We do however store your vote. You will get a receipt for that.</li>
                            <li>If you don't know what this tool is doing, continue reading</li>
                        </ol>
                        <p>
                            This tool was created to measure in many different ways how the community thinks. We have chosen 4 key indicators
                            that are detractable from the blockchain to measure that. Following is an explanation of all 4 of these:
                        </p>
                        <p><FontAwesomeIcon icon={faGasPump} /> Gas Voting</p>
                        <p>
                        Here all the gas that was spent on the addresses that voted is counted together.
                        </p>
                        <p><FontAwesomeIcon icon={faCoins} /> Coin Voting</p>
                        <p>
                        The sum of all ether hold by the voting addresses is shown in units of full eth but calculated on the wei.
                        </p>
                        <p><FontAwesomeIcon icon={faCogs} /> Developer Voting</p>
                        <p>
                        All gas that someone spent on a contract which was created by one of the voting addresses is counted here.
                        </p>
                        <p><FontAwesomeIcon icon={faCubes} /> Miner Voting</p>
                        <p>
                        The summed difficulty of every block mined by the voting addresses.
                        </p>
                        <Waypoint onEnter={this.handleWaypointEnter}/>
                    </div>
                </section>
                <footer className="modal-card-foot">
                    {this.state.hasScrolled?
                    <button className="button is-link" onClick={this.props.handleCloseWelcomeModal}>Got it!</button>:
                    <button className="button is-link" onClick={this.props.handleCloseWelcomeModal} disabled>Got it!</button>}
                </footer>
            </div>
            </div>
        )
    }
}

export default PollCollectionWelcomeModal;