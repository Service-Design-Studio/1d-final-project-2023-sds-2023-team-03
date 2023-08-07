import { useState, useEffect } from 'react'
import { Badge, Group, Stack } from '@mantine/core'

function ProductInsights({ insightData }) {
    const [data, setData] = useState([])
    
    useEffect(() => {
        if (!insightData.length) return;
        setData(insightData
            .filter((e) => e)
            .sort((a, b) => {
                var keyA = a.severity.level;
                var keyB = b.severity.level;
                if (keyA > keyB) return 1;
                if (keyA < keyB) return -1;
                return 0;
            }))

    }, [insightData])

    return (
        <Stack spacing = "0">{data.map((ins) => {
            return (
                <Group spacing = "xs">
                    <Badge>{ins.severity.label}</Badge>
                    <p>{ins.text}</p>
                </Group>
            )
        })}</Stack>
    )
}

export default ProductInsights;