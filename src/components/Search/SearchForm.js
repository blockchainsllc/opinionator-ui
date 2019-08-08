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