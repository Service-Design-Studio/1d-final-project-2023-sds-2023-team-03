import './Categories.css'
import { Stack } from '@mantine/core'
import 'tailwindcss/tailwind.css';
import CategorySearch from '../components/CategorySearch';
import SalesBar from '../components/SalesBar'
import { useState } from 'react'

const Categories = () => {
    const [salesData, setSalesData] = useState({
        x: [],
        y: []
    })

    function handleSalesData(data) {
        setSalesData(data)
        console.log(data)
    }

    return(
        <>
            <Stack>
                <h1>Analysis by Category</h1>
                <CategorySearch handleSalesData={handleSalesData} className="search"/>
                <div className="sales-graph">
                    <SalesBar salesData={salesData}/>
                </div>
            </Stack>
        </>
    )
}

export default Categories