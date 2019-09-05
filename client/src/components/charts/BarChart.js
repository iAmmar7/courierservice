import React, { PureComponent } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const data = [
  {
    name: 'Jan', revenue: 4000, income: 2400, amt: 2400,
  },
  {
    name: 'Feb', revenue: 3000, income: 1398, amt: 2210,
  },
  {
    name: 'Mar', revenue: 2000, income: 9800, amt: 2290,
  },
  {
    name: 'Apr', revenue: 2780, income: 3908, amt: 2000,
  },
  {
    name: 'May', revenue: 1890, income: 4800, amt: 2181,
  },
  {
    name: 'Jun', revenue: 2390, income: 3800, amt: 2500,
  },
  {
    name: 'Jul', revenue: 3490, income: 4300, amt: 2100,
  },
  {
    name: 'Aug', revenue: 2000, income: 12800, amt: 2290,
  },
  {
    name: 'Sep', revenue: 2780, income: 3908, amt: 2000,
  },
  {
    name: 'Oct', revenue: 1890, income: 4800, amt: 2181,
  },
  {
    name: 'Nov', revenue: 2390, income: 3800, amt: 2500,
  },
  {
    name: 'Dec', revenue: 3490, income: 4300, amt: 2100,
  },
];

export default class SimpleBarChart extends PureComponent {

  render() {
    return (
      <BarChart
        width={650}
        height={300}
        data={data}
        margin={{
          top: 0, right: 0, left: 0, bottom: 0,
        }}
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="income" fill="#00b26f" />
        <Bar dataKey="revenue" fill="#fa4251" />
      </BarChart>
    );
  }
}
