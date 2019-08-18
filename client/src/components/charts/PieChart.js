import React, { PureComponent } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, Legend
} from 'recharts';

const data = [
  { name: 'Delivered', value: 40 },
  { name: 'Returned', value: 30 }
];
const COLORS = ['#00b26f', '#fa4251'];


class SimplePieChart extends PureComponent {

  render() {
    return (
      <PieChart width={200} height={250} onMouseEnter={this.onPieEnter}>
        <Pie
          data={data}
          cx={80}
          cy={110}
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
          label
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