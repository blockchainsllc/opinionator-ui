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

import React from 'react';
import { Chart } from 'react-chartjs-2';

class SinglePollPieChart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      titles: null,
      data: null
    }
  }

  buildPieChart() {
    var ctxP = document.getElementById("pieChart").getContext('2d');
    new Chart(ctxP, {
      type: 'pie',
      data: {
        labels: this.state.titles,
        datasets: [
          {
            data: this.state.data,
            backgroundColor: ['#39B7CD', '#436B95', '#3A5FCD', '#4876FF', '#27408B', '#302B54', '#8EE5EE', '#4E5180', '#1D2951'],
            hoverBackgroundColor: ['#70cbdb', '#7298c0', '#5c7ad6', '#668cff', '#3253b3', '#4d4587', '#bceff5', '#61659e', '#293970']
          }
        ]
      },
      options: {
        responsive: true,
        legend: false, //{position: 'bottom'}
        animation: false
      }
    });
  }

  componentDidMount() {
    this.update(this.props)
  }

  componentWillReceiveProps(props) {
    this.update(props)
  }

  update(props) {
    this.setState(
      {
        titles: props.proposalData.map((proposal) => proposal.name),
        data: props.proposalData.map((proposal) => proposal.percentage)
      }
      , () => this.buildPieChart());
  }

  render() {
    return (
      <div>
          <canvas id="pieChart"></canvas>
        </div>
      );
  }

}
;

export default SinglePollPieChart;
