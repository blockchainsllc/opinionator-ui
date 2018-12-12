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

  handleKeyPressedInputField(e) {
    if (e.key === 'Enter') {
      console.log('do validate');
    }
  }

  render() {
    return (
      <form className="box">
            <label className="label is-large has-text-centered">Search</label>
            <input className="input" type="text" onKeyPress={this.handleKeyPressedInputField}></input>
        </form>
    )
  }
}

export default SearchForm;