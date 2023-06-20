import React from "react";
import ReactEcharts from "echarts-for-react"; 
function BarGraph({salesData}) {  
    const option = {
        xAxis: {
            type: 'category',
            data: salesData.x,
            name: "Product Name",
            nameLocation: "middle"
        },
        yAxis: {
            type: 'value',
            name: "Sales",
            nameLocation: "end",
            nameRotate: false
        },
        series: [{
            data: salesData.y,
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
        }],
        grid: {
            show: true
        }
    }; 
    return <ReactEcharts option={option} />;
} 
export default BarGraph;