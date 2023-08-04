import './Categories.css'
import { Stack, Space } from '@mantine/core'
import CategorySearch from '../components/CategorySearch';
import SalesBar from '../components/SalesBar'
import { useState } from 'react'
import SalesSegment from '../components/SalesSegment'

const Categories = () => {
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
    }

    function handleOnChange(data) {
        setRender(data)
    }

    function renderGraph() {
        switch (render) {
            case "frequencies":
                return (
                    <SalesBar 
                        data={
                            {
                                x: salesData.frequencies.x_axis,
                                y: salesData.frequencies.y_axis,
                                start: salesData.start,
                                end: salesData.end,
                                category: salesData.category
                            }
                        }
                        label="Product unit"
                        colour="#92cad1"
                    />
                )
            case "revenues":
                return (
                    <SalesBar
                        data={
                            {
                                x: salesData.revenues.x_axis,
                                y: salesData.revenues.y_axis,
                                start: salesData.start,
                                end: salesData.end,
                                category: salesData.category
                            }
                        }
                        label="Product revenue"
                        enableCurrency
                        colour="#006341"
                    />
                )
            
            case "types-frequencies":
                const freqs = salesData.types.frequency;

                return (
                    <SalesBar
                        data={
                            {
                                x: freqs ? salesData.types.frequency.x_axis : [],
                                y: freqs ? salesData.types.frequency.y_axis : [],
                                start: salesData.start,
                                end: salesData.end,
                                category: salesData.category
                            }
                        }
                        label="Apparel unit"
                        colour="#79ccb3"
                    />
                )

            case "types-revenues":
                const revs = salesData.types.revenue;

                return (
                    <SalesBar
                        data={
                            {
                                x: revs ? salesData.types.revenue.x_axis : [],
                                y: revs ? salesData.types.revenue.y_axis : [],
                                start: salesData.start,
                                end: salesData.end,
                                category: salesData.category
                            }
                        }
                        label="Apparel revenue"
                        enableCurrency
                        colour="#e9724d"
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