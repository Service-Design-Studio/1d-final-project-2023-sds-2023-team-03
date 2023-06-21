import './Categories.css'
import { Stack, Space } from '@mantine/core'
import 'tailwindcss/tailwind.css';
import CategorySearch from '../components/CategorySearch';
import SalesBar from '../components/SalesBar'
import { useState } from 'react'

const Categories = () => {
    const [used, setUsed] = useState(false)

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

    return(
        <>
            <Stack>
            <h1 id="sales-title">Sales Analytics</h1>
               <CategorySearch handleSalesData={handleSalesData} className="search"/>
                <Space h="xl"/>
                <div className="sales-graph">
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
                </div>
            </Stack>
        </>
    )
}

export default Categories