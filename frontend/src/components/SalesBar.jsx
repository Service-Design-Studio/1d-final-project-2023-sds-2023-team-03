import React from "react";
import ReactEcharts from "echarts-for-react"; 
function SalesBar({salesData}) {  
    const option = {
        xAxis: {
            type: 'category',
            data: salesData.x,
            name: "Product Name",
            nameTextStyle: {
                fontSize: 16,
                fontfamily: "puma-regular",
                lineHeight: 90
            },
            axisLabel: {
                interval: 0
            },
            nameLocation: "middle"
        },
        yAxis: {
            type: 'value',
            name: "Sales",
            nameTextStyle: {
                fontSize: 16,
                fontfamily: "puma-regular",  
            },
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
export default SalesBar;