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

class SearchForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inputSearch: "",
    }
    this.handleChangeInputSearch = this.handleChangeInputSearch.bind(this);
    this.handleKeyPressedInputField = this.handleKeyPressedInputField.bind(this)
  }

  handleKeyPressedInputField(e) {
    if (e.key === 'Enter') {
      console.log('do validate');
      this.props.history.push('/search/' + e.target.value)
    }
  }

  handleChangeInputSearch(e) {
    this.setState({
      inputSearch: e.target.value,
    })
  }

  render() {
    return (
      <div className="box">
            <label className="label is-large has-text-centered">Search</label>
            <input className="input" type='text' placeholder='Search...' maxLength='20' value={this.state.inputSearch} onChange={this.handleChangeInputSearch} onKeyPress={this.handleKeyPressedInputField}/>
        </div>
    )
  }
}

export default SearchForm;