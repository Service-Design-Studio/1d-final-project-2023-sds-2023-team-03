import { SegmentedControl } from '@mantine/core';

function SalesSegment({handleOnChange}) {
    const data = [
        {value: "frequencies", label: "Product Units"},
        {value: "revenues", label: "Product Revenue"},
        {value: "types-frequencies", label: "Apparel Units"},
        {value: "types-revenues", label: "Apparel Revenue"},
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