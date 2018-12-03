import React, { Component } from 'react'

class SearchForm extends Component {
  render() {
    return (
      <form className="box">
            <label className="label is-large has-text-centered">Search</label>
            <input className="input" type="text"></input>
        </form>
    )
  }
}

export default SearchForm;