import { useState, useEffect } from 'react'
import { Badge, Flex, Stack, Text } from '@mantine/core'
import { makeStyles } from '@mui/styles';
import { VscWarning } from 'react-icons/vsc';
import { FiThumbsDown, FiThumbsUp } from 'react-icons/fi';
import { RiEmotionNormalLine } from 'react-icons/ri';
import { LuPartyPopper } from 'react-icons/lu';

const useStyles = makeStyles(() => ({
    container: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 5,
      paddingLeft: '15px',
    },
    badge: {
        paddingLeft : '5px',
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
            let icon = ins.severity.label === 'Critical' ? <VscWarning fontSize="1.2em" color="white" /> : (ins.severity.label === 'Severe' ? <FiThumbsDown fontSize="1.2em" color="red" /> : (ins.severity.label === 'Moderate' ? <RiEmotionNormalLine fontSize="1.2em" color="black" /> : (ins.severity.label === 'Positive' ? <FiThumbsUp fontSize="1.2em" color="teal" /> : <LuPartyPopper fontSize="1.2em" color="white" />)))
            let textColor = ins.severity.label === 'Moderate' ? 'dark' : (ins.severity.label === 'Critical' || ins.severity.label === 'Severe' ? 'red' : 'green');
            return (
                <div className={classes.container}>
                    <Badge className={classes.badge}
                     color={textColor}
                     variant = {ins.severity.label === 'Critical' || ins.severity.label === 'Exceptional' ? 'filled' : 'outline'}
                     >
                        <Flex align='center' gap='0.2em'>
                            {icon}{ins.severity.label}
                        </Flex>
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