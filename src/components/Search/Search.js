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
                                <SearchForm/>
                            </div>
                        </div>
                    </div>
                </div>
        </section> : <SearchEntered />)
  }
}

export default Search;