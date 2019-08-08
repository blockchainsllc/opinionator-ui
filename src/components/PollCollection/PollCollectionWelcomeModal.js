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
                            Welcome to the opinionator! A few things you need to know before we start:
                        </h3>
                        <ol>
                            <li>We dont store any of your private key information :)</li>
                            <li>We do however store your vote. You will get a receipt for that.</li>
                            <li>If you dont know what this tool is doing, continue reading</li>
                        </ol>
                        <p>
                            This tool was created to measure in many different ways how the comunity thinks. We have chosen 4 key indicators
                            that are detractable from the blockchain to measure that. Following is an explanation of all 4 of these:
                        </p>
                        <p><FontAwesomeIcon icon={faGasPump} /> Gas Voting</p>
                        <p>
                        Here all gas that was spend on the addresses that voted are counted together.
                        </p>
                        <p><FontAwesomeIcon icon={faCoins} /> Coin Voting</p>
                        <p>
                        The sum of all ether hold by the voting addresses is shown in units of full eth but calculated on the wei.
                        </p>
                        <p><FontAwesomeIcon icon={faCogs} /> Developer Voting</p>
                        <p>
                        All gas that someone spend on a contract which was created by on of the voting addresses is counted here.
                        </p>
                        <p><FontAwesomeIcon icon={faCubes} /> Miner Voting</p>
                        <p>
                        Summed difficulty of every block mined by the voting addresses.
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