import React, { PureComponent } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, Legend
} from 'recharts';


const COLORS = ['#00b26f', '#fa4251', '#E69743'];


class SimplePieChart extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { name: 'Delivered', value: 100 },
        { name: 'Returned', value: 100 },
        { name: 'Pending', value: 100 }
      ]
    }
  }

  render() {
    const { data } = this.state;

    let dispData, chartHeight = 260;
    if (this.props.pending) {
      dispData = [
        { name: 'Delivered', value: this.props.delivered },
        { name: 'Returned', value: this.props.returned },
        { name: 'Pending', value: this.props.pending }
      ];
    } else {
      chartHeight = 240;
      dispData = [
        { name: 'Delivered', value: this.props.delivered },
        { name: 'Returned', value: this.props.returned }
      ];
    }

    return (
      <PieChart width={210} height={chartHeight} onMouseEnter={this.onPieEnter} className="pie-chart" >
        <Pie
          data={dispData}
          cx={80}
          cy={110}
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
        >
          {
            data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
          }
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    );
  }
}

export default SimplePieChart;