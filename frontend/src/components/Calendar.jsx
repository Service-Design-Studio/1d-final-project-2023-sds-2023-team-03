import React from 'react'
import 'tailwindcss/tailwind.css';

import { useState } from 'react';
import { Button } from '@mantine/core';
import { DatePicker } from '@mantine/dates';

import './Calendar.css'

const Calendar = ({handleCalendar}) => {
    const [value, setValue] = useState([null, null]);

    function handleOnClick() {
        handleCalendar(value)
    }   

    return (
        <div>
            <DatePicker defaultDate={new Date()} type="range" value={value} onChange={setValue}/>
            <Button className="gobutton" variant="outline" onClick={handleOnClick}>Go!</Button>
        </div>
    );
}


export default Calendar