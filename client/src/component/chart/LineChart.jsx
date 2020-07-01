import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    name: "Page A",
    value: 4000,
  },
  {
    name: "Page B",
    value: 3000,
  },
  {
    name: "Page C",
    value: 2000,
  },
  {
    name: "Page D",
    value: 2780,
  },
  {
    name: "Page E",
    value: 1890,
  },
  {
    name: "Page F",
    value: 2390,
  },
  {
    name: "Page G",
    value: 3490,
  },
];

export default class Example extends PureComponent {
  static jsfiddleUrl = "https://jsfiddle.net/alidingling/xqjtetw0/";
  render() {
    const { records } = this.props;
    return (
      <LineChart
        width={500}
        height={300}
        data={records ? records : data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    );
  }
}
