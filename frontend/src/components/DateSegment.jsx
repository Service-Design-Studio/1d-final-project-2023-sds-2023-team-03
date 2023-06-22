import React from 'react'

import { SegmentedControl } from '@mantine/core';
import { useState } from 'react';


const DateSegment = ({savedPreset, handleDateSegment}) => {
    const [data, setData] = useState([
      { value: '7d', label: 'Last 7 days' },
      { value: '30d', label: 'Last 30 days' },
      { value: '6m', label: 'Last 6 months' },
      { value: '12m', label: 'Last 12 months' },
    ]);

    return (

      <>
        <SegmentedControl
          defaultValue = {savedPreset}
          data={data}
          onChange={handleDateSegment}/>
      </>
    );
}

export default DateSegment;