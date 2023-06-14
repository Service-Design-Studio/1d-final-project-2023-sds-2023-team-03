import React from 'react';
import ReactEcharts from 'echarts-for-react';

const BarGraph = () => {
  // Options for the first graph
  const option1 = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
      },
    ],
  };

  return (
    <div>
      <h1>Multiple Bar Graphs</h1>
      <ReactEcharts option={option1} />
    </div>
  );
};

export default BarGraph;