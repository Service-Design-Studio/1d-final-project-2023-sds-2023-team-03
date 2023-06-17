import React, {useState} from 'react'
import DateSegment from './DateSegment.jsx'
import CategorySelect from './CategorySelect.jsx'
import { Button, Group, ActionIcon, Stack, Space } from '@mantine/core'
import { AiOutlineCalendar } from 'react-icons/ai'
import { GiHamburgerMenu } from 'react-icons/gi'
import { DatePickerInput } from '@mantine/dates'
import './CategorySearch.css'

const CategorySearch = () => {
    const today = new Date();
    const lastWeek = new Date(new Date().setDate(today.getDate() - 7))
    const lastMonth = new Date(new Date().setDate(today.getDate() - 30))
    const lastHalfYear = new Date(new Date().setDate(today.getDate() - 180))
    const lastYear = new Date(new Date().setDate(today.getDate() - 365))


    const [calendar, setCalendar] = useState(false)
    const [presetDate, setPresetDate] = useState([lastMonth, today])
    const [calendarDate, setCalendarDate] = useState([null, null])
    const [category, setCategory] = useState("RUNNING")

    function handleOnClick() {
        const dates = (calendar && calendarDate) || presetDate;

        if (dates.includes(null)) {
            console.log("invalid")
        } else {
            console.log("valid")
            console.log(dates[0], dates[1])
            console.log(category)
        }
    }

    function handleDateSegment(val) {
        switch (val) {
            case '7d':
                setPresetDate([lastWeek, today])
            case '30d':
                setPresetDate([lastMonth, today])
            case '6m':
                setPresetDate([lastHalfYear, today])
            case '12m':
                setPresetDate([lastYear, today])
        }
    }

    function renderDatePick(calendar) {
        switch (calendar) {
            case true:
                return (
                    <>
                        <DatePickerInput
                            type="range"
                            label="Time period"
                            placeholder="Click to choose..."
                            value={calendarDate}
                            onChange={setCalendarDate}>
                        </DatePickerInput>
                        <ActionIcon onClick={() => setCalendar(!calendar)} className="calendarbutton" variant="outline">
                            <GiHamburgerMenu/>
                        </ActionIcon>
                    </> 
                )

            case false:
                return (
                    <>
                        <Stack>
                            <Space h="xs"/>
                            <DateSegment handleDateSegment={handleDateSegment}/>
                        </Stack>
                        <ActionIcon onClick={() => setCalendar(!calendar)} className="calendarbutton" variant="outline">
                            <AiOutlineCalendar/>
                        </ActionIcon>
                    </>
                )
        }
    }

    return (
        <Stack align="center" spacing="xs" className="dropdownContainer">
            <Group spacing="xs">
                <CategorySelect setCategory={setCategory}/>
                {renderDatePick(calendar)}
            </Group>
            <Button className="button" onClick={handleOnClick}>
                Search!
            </Button>
        </Stack>
    )
}

export default CategorySearch;