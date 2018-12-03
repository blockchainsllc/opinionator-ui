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