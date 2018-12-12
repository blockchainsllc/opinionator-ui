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
import Slider from 'react-rangeslider'
import '../styles/SinglePollSlider.css'

class SinglePollSlider extends Component {

  render() {
    return (
      <Slider
      value={this.props.currentValue}
      orientation="horizontal"
      onChange={this.props.onSliderChange}
      />
    )
  }
}

export default SinglePollSlider;