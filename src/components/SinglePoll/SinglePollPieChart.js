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
