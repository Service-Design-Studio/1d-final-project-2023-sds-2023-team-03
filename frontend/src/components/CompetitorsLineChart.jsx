import Chart from "react-apexcharts";

function CompetitorsLineChart({competitorData}) {

    var title = "Competitors Data"

    // // Merge and sort the dates
    // let allDates = [...salesData.x, ...competitorsData.x];
    // allDates.sort((a, b) => new Date(a) - new Date(b));

    var chart = {
        options: {
            chart: {
                type: "line"
            },
            xaxis: {
                type: 'datetime',
                labels: {
                    show: true,
                    format: 'MMM yyyy',
                    style: {
                        fontSize: "14px",
                        fontFamily: "puma-regular",
                        fontWeight: 400
                    }
                }
            },
            yaxis: {
                title: {
                    text: 'Sales'
                }
            },
            plotOptions: {
                line: {
                    curve: 'smooth'
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
                name: "Sales",
                data: competitorData
            }
        ]
    }

    return (
        <div className="competitors-line-chart">
            <Chart
                options={chart.options}
                series={chart.series}
                type="line"
            />
        </div>
    )

    // var height= "500";
    // if (competitorsData.x.length >= 50 || competitorsData.x.length >= 50) {
    //     height = "1500"
    // } else if (competitorsData.x.length >= 10 || competitorsData.x.length >= 10) {
    //     height = "1000"
    // }
    // return <Chart options={chart.options} series={chart.series} type="line" width="1200" height={height} />
}
export default CompetitorsLineChart;






//    // Transform data into the format needed for ApexCharts
//   const salesSeries = salesData.map(data => ({
//     x: new Date(data.date).getTime(), // Convert to timestamp for x-axis
//     y: data.sales,
//   }));

//   const competitorsSeries = competitorsData.map(data => ({
//     x: new Date(data.date).getTime(), // Convert to timestamp for x-axis
//     y: data.sales,
//   }));

//   // Prepare chart series and options
//   const series = [
//     {
//       name: 'Sales',
//       data: salesSeries,
//     },
//     {
//       name: 'Competitors',
//       data: competitorsSeries,
//     },
//   ];

//   const options = {
//     chart: {
//       type: 'line',
//     },
//     xaxis: {
//       type: 'datetime',
//       labels: {
//         format: 'MMM yyyy', // Format date as 'MMM yyyy'
//       },
//     },
//     title: {
//       text: 'Sales and Competitors data comparison',
//       align: 'center',
//     },
//   };

//   return (
//     <div>
//       <Chart options={options} series={series} type="line" />
//     </div>
//   );

