import React, { PureComponent } from 'react';
import {
  PieChart, Pie, Cell, Tooltip, Legend
} from 'recharts';


const COLORS = ['#00b26f', '#fa4251'];


class SimplePieChart extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { name: 'Delivered', value: 100 },
        { name: 'Returned', value: 100 }
      ]
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.deliver !== 0 || nextProps.return !== 0) {
      this.setState({
        data: [
          { name: 'Delivered', value: nextProps.deliver },
          { name: 'Returned', value: nextProps.return }
        ]
      })
    }
  }

  render() {
    const { data } = this.state;
    return (
      <PieChart width={210} height={240} onMouseEnter={this.onPieEnter} className="pie-chart" >
        <Pie
          data={data}
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