import React, { useState } from "react";
import Chart from "react-apexcharts"
function SalesBar({salesData, used}) {  

    var title = "Use the selectors above to search for sales data!"

    if (salesData.x.length > 0) {
        title = `Sales data for "${salesData.category}" from ${salesData.start} to ${salesData.end}:`
    } else if (salesData && used) {
        title = `No data found for "${salesData.category}" from ${salesData.start} to ${salesData.end}.`
    }

    var chart = {
        options: {
            chart: {
              type: "bar",
              stacked: true
            },
            xaxis: {
                categories: salesData.x,
                labels: {
                    show: true,
                    style: {
                        fontSize: "14px",
                        fontFamily: "puma-regular",
                        fontWeight: 400
                    }
                }
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                    columnWidth: '100%'
                }
            },
            title: {
                text: title,
                align: "center",
                style: {
                    fontSize: '30px',
                    fontFamily: "puma-regular"
                }
            }
        },
        series: [
            {
                name: "Number of sales",
                data: salesData.y
            }
        ]
    }

    var height = "500";
    if (salesData.x.length >= 50) {
        height = "1500"
    } else if (salesData.x.length >= 10) {
        height = "1000"
    }
    return <Chart options={chart.options} series={chart.series} type="bar" width="1200" height = {height}/>;
} 
export default SalesBar;