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
import SearchForm from './SearchForm'
import SearchEntered from './SearchEntered'


class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearched: false
    }
  }
  render() {
    return (!this.state.isSearched ? <section className="hero is-fullheight is-light">
                <div className="hero-body">
                    <div className="container">
                        <div className="columns is-centered">
                            <div className="column is-5-tablet is-6-desktop is-7-widescreen">
                                <SearchForm history={this.props.history}/>
                            </div>
                        </div>
                    </div>
                </div>
        </section> : <SearchEntered />)
  }
}

export default Search;