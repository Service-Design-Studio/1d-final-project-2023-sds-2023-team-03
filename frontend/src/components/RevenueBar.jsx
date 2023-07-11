import React from "react";
import Chart from "react-apexcharts"
function RevenueBar({salesData, used}) {  

    if (!salesData.x) {
        salesData = {
            x: [],
            y: [],
            category: salesData.category,
            start: salesData.start,
            end: salesData.end
        }
    } else {
        salesData.y = salesData.y.map((n) => {
            return Number(n.toFixed(0));
        })
    }

    var title = "Use the selectors above to search for sales data!"

    if (salesData.x.length > 0) {
        title = `Product revenue data for "${salesData.category}" from ${salesData.start} to ${salesData.end}:`
    } else if (salesData && used) {
        title = `No product revenue data found for "${salesData.category}" from ${salesData.start} to ${salesData.end}.`
    }

    var chart = {
        options: {
            chart: {
              type: "bar",
              stacked: true
            },
            colors: [
                "#006341"
            ],
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
            yaxis: {
                labels: {
                    show: true
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
            },
            dataLabels: {
                enabled: true,
                textAnchor: 'start',
                offsetX: 0,
                formatter: (val, opt) => {
                    return `${new Intl.NumberFormat('en-SG', {
                        style: 'currency',
                        currency: 'SGD'
                    }).format(val)}`;
                }
            },
            tooltip: {
                y: {
                    formatter: (val) => {
                        return `${new Intl.NumberFormat('en-SG', {
                            style: 'currency',
                            currency: 'SGD'
                        }).format(val)}`;
                    }
                }
            }
        },
        series: [
            {
                name: "Revenue",
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
export default RevenueBar;