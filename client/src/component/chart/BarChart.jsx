import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

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

const getPath = (x, y, width, height) => `M${x},${y + height}
          C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${
  x + width / 2
}, ${y}
          C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${
  y + height
} ${x + width}, ${y + height}
          Z`;

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

TriangleBar.propTypes = {
  fill: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default class Example extends PureComponent {
  static jsfiddleUrl = "https://jsfiddle.net/alidingling/rnywhbu8/";
  render() {
    const { records } = this.props;
    return (
      <BarChart
        width={500}
        height={300}
        data={records ? records : data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Bar
          dataKey="value"
          fill="#8884d8"
          shape={<TriangleBar />}
          label={{ position: "top" }}
        >
          {records
            ? records.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % 20]} />
              ))
            : data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % 20]} />
              ))}
        </Bar>
      </BarChart>
    );
  }
}
