import { SegmentedControl } from '@mantine/core';

function SalesSegment({handleOnChange}) {
    const data = [
        {value: "frequencies", label: "Product Frequency"},
        {value: "revenues", label: "Product Revenue"},
        {value: "types-frequencies", label: "Apparel Frequency"},
        {value: "types-revenues", label: "Apparel Revenue"},
        {value: "summary", label: "Insights"},
    ]

    return (
    <>
    <SegmentedControl 
        color="teal"
        data={data}
        onChange={handleOnChange}
        fullWidth={false}/>
    </>
    )
}

export default SalesSegment;