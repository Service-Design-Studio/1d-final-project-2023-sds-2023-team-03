import { useState, useEffect } from 'react'
import { Badge, Group, Stack, Text } from '@mantine/core'
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    container: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 5,
      paddingLeft: '15px',
    },
    badge: {
        flexShrink: 0,
      },
  }));

function ProductInsights({ insightData }) {
    const [data, setData] = useState([])
    
    useEffect(() => {
        if (!insightData.length) return;
        setData(insightData
            .filter((e) => e)
            .sort((a, b) => {
                var keyA = a.severity.level;
                var keyB = b.severity.level;
                if (keyA > keyB) return -1;
                if (keyA < keyB) return 1;
                return 0;
            }))

    }, [insightData])

    const classes = useStyles();
    return (
        <Stack spacing = "0">{data.map((ins) => {
            let textColor = ins.severity.label === 'Moderate' ? 'dark' : (ins.severity.label === 'Critical' || ins.severity.label === 'Severe' ? 'red' : 'green');
            return (
                <div className={classes.container}>
                    <Badge className={classes.badge}
                     color={textColor}
                     variant = {ins.severity.label === 'Critical' || ins.severity.label === 'Exceptional' ? 'filled' : 'outline'}
                     >
                        {ins.severity.label}
                    </Badge>
                    <Text style={{ color: textColor }}>
                        {ins.text}
                    </Text>
                </div>
            )
        })}</Stack>
    )
}

export default ProductInsights;