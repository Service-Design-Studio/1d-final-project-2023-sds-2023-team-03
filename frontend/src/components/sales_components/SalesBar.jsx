import React, { useEffect, useRef } from "react";
import Chart from "react-apexcharts"
function SalesBar({ data, label, colour, enableCurrency=false }) {  
    const isUsed = useRef(false);

    useEffect(() => {
        isUsed.current = true;
    }, [data])


    if (!data.x) {
        data = {
            x: [],
            y: [],
            category: data.category,
            start: data.start,
            end: data.end
        }
    } else {
        data.x = data.x.slice(0, 20)
        data.y = data.y
        .slice(0, 20)
        .map((n) => {
            return Number(n.toFixed(0));
        })
    }

    var title = `Use the selectors above to search for ${title} data!`

    if (data.x.length > 0) {
        title = `${label} data for "${data.category}" from ${data.start} to ${data.end}:`
    } else if (data && isUsed) {
        title = `No ${label.toLowerCase()} data found for "${data.category}" from ${data.start} to ${data.end}.`
    }

    var chart = {
        options: {
            chart: {
              type: "bar",
              stacked: true
            },
            colors: [
                colour
            ],
            xaxis: {
                categories: data.x,
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
            },
            tooltip: {
                y: {
                    formatter: (val) => {
                        return enableCurrency ?
                        `${new Intl.NumberFormat('en-SG', {
                            style: 'currency',
                            currency: 'SGD'
                        }).format(val)}`
                        : val;
                    }
                }
            },
            dataLabels: {
                enabled: true,
                textAnchor: 'start',
                offsetX: 0,
                formatter: (val, opt) => {
                    return enableCurrency ? 
                    `${new Intl.NumberFormat('en-SG', {
                        style: 'currency',
                        currency: 'SGD'
                    }).format(val)}`
                    : val;
                } 
            }
        },
        series: [
            {
                name: enableCurrency ? "Revenue" : "Units sold",
                data: data.y
            }
        ]
    }

    var height = "500";
    if (data.x.length >= 50) {
        height = "1500"
    } else if (data.x.length >= 10) {
        height = "1000"
    }
    return <Chart options={chart.options} series={chart.series} type="bar" width="1200" height = {height}/>;
} 
export default SalesBar;