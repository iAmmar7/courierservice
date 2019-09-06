import React, { PureComponent } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const data = [
  {
    name: 'Jan', income: 12000, revenue: 4300, amt: 2400,
  },
  {
    name: 'Feb', income: 16000, revenue: 5600, amt: 2210,
  },
  {
    name: 'Mar', income: 21000, revenue: 9800, amt: 2290,
  },
  {
    name: 'Apr', income: 27800, revenue: 10060, amt: 2000,
  },
  {
    name: 'May', income: 18900, revenue: 6800, amt: 2181,
  },
  {
    name: 'Jun', income: 23900, revenue: 13800, amt: 2500,
  },
  {
    name: 'Jul', income: 34900, revenue: 20300, amt: 2100,
  },
  {
    name: 'Aug', income: 20000, revenue: 14800, amt: 2290,
  },
  {
    name: 'Sep', income: 27800, revenue: 19908, amt: 2000,
  },
  {
    name: 'Oct', income: 18900, revenue: 9000, amt: 2181,
  },
  {
    name: 'Nov', income: 23900, revenue: 10800, amt: 2500,
  },
  {
    name: 'Dec', income: 34900, revenue: 19300, amt: 2100,
  },
];

export default class SimpleBarChart extends PureComponent {

  render() {
    return (
      <BarChart
        width={700}
        height={300}
        data={data}
        style={{ fill: "#fff" }}
      >
        {/* <CartesianGrid style={{ fill: "#fff" }} strokeDasharray="3 3" /> */}
        <XAxis dataKey="name" style={{ fill: "#fff" }} />
        <YAxis style={{ fill: "#fff" }} />
        <Tooltip style={{ fill: "#fff" }} />
        <Legend style={{ fill: "#fff" }} />
        <Bar dataKey="income" fill="#fa4251" />
        <Bar dataKey="revenue" fill="#00b26f" />
      </BarChart>
    );
  }
}
