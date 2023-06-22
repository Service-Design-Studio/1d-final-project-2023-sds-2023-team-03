import './Categories.css'
import { Stack, Space } from '@mantine/core'
import 'tailwindcss/tailwind.css';
import CategorySearch from '../components/CategorySearch';
import SalesBar from '../components/SalesBar'
import { useState } from 'react'
import SalesSegment from '../components/SalesSegment'
import RevenueBar from '../components/RevenueBar';
import ApparelFreqBar from '../components/ApparelFreqBar';
import ApparelRevBar from '../components/ApparelRevBar'

const Categories = () => {
    const [used, setUsed] = useState(false)
    const [render, setRender] = useState("frequencies")
    const [salesData, setSalesData] = useState({
        frequencies: {},
        revenues: {},
        types: {},
        start: "",
        end: "",
        category: ""
    })

    function handleSalesData(data) {
        setSalesData(data)
        setUsed(true)
    }

    function handleOnChange(data) {
        setRender(data)
    }

    function renderGraph() {
        switch (render) {
            case "frequencies":
                return (
                    <SalesBar 
                        salesData={
                            {
                                x: salesData.frequencies.x_axis,
                                y: salesData.frequencies.y_axis,
                                start: salesData.start,
                                end: salesData.end,
                                category: salesData.category
                            }
                        } 
                        used={used}
                    />
                )
            case "revenues":
                return (
                    <RevenueBar
                        salesData={
                            {
                                x: salesData.revenues.x_axis,
                                y: salesData.revenues.y_axis,
                                start: salesData.start,
                                end: salesData.end,
                                category: salesData.category
                            }
                        }
                    />
                )
            
            case "types-frequencies":
                var x; var y;
                if (salesData.types.frequency) {
                    x = salesData.types.frequency.x_axis;
                    y = salesData.types.frequency.y_axis;
                } else {
                    x = [];
                    y = [];
                }
                return (
                    <ApparelFreqBar
                        salesData={
                            {
                                x: x,
                                y: y,
                                start: salesData.start,
                                end: salesData.end,
                                category: salesData.category
                            }
                        }
                    />
                )

            case "types-revenues":
                var x; var y;
                if (salesData.types.revenue) {
                    x = salesData.types.revenue.x_axis;
                    y = salesData.types.revenue.y_axis;
                } else {
                    x = [];
                    y = [];
                }
                return (
                    <ApparelRevBar
                        salesData={
                            {
                                x: x,
                                y: y,
                                start: salesData.start,
                                end: salesData.end,
                                category: salesData.category
                            }
                        }
                    />
                )
            case "summary":
                return (
                    <div></div>
                )
        }
    }

    return(
        <>
            <Stack>
            <h1 id="sales-title">Sales Analytics</h1>
               <CategorySearch handleSalesData={handleSalesData} className="search"/>
                <Space h="xl"/>
                <Space h="xl"/>
                <div className="sales-segment">
                    <SalesSegment handleOnChange={handleOnChange}/>
                </div>
                <div className="sales-graph">
                    {renderGraph()}
                </div>
            </Stack>
        </>
    )
}

export default Categories