import React, {useState} from 'react'
import DateSegment from './DateSegment.jsx'
import CategorySelect from './CategorySelect.jsx'
import { Button, Group, ActionIcon, Stack, Space, Tooltip } from '@mantine/core'
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
    const [selectedPreset, setSelectedPreset] = useState('30d')
    const [calendarDate, setCalendarDate] = useState([null, null])
    const [category, setCategory] = useState("running")

    function handleOnClick() {
        const dates = (calendar && calendarDate) || presetDate

        if (dates.includes(null)) {
            console.log("pag")
        } else {
            console.log("valid")
            console.log(dates[0], dates[1])
            console.log(category)
        }
    }

    function handleDateSegment(val) {
        setSelectedPreset(val)
        switch (val) {
            case "7d":
                setPresetDate([lastWeek, today])
                break;
            case "30d":
                setPresetDate([lastMonth, today])
                break;
            case "6m":
                setPresetDate([lastHalfYear, today])
                break;
            case "12m":
                setPresetDate([lastYear, today])
                break;
        }
    }


    // Returns calendar pick if calendar button pressed. SegmentedControl otherwise.
    function renderDatePick(calendar) {
        switch (calendar) {
            case true:
                return (
                    <>
                        <Stack>
                            <Space h="xs"/>
                            <DatePickerInput
                            className="date"
                            type="range"
                            placeholder="Click to choose..."
                            defaultValue={[lastMonth, today]}
                            defaultDate
                            value={calendarDate}
                            maxDate={today}
                            onChange={setCalendarDate}>
                        </DatePickerInput>
                        </Stack>
                        <Tooltip label="Switch to date presets">
                            <ActionIcon onClick={() => setCalendar(!calendar)} className="calendarbutton" variant="outline">
                                <GiHamburgerMenu/>
                            </ActionIcon>
                        </Tooltip>
                    </> 
                )

            case false:
                return (
                    <>
                        <Stack>
                            <Space h="xs"/>
                            <DateSegment savedPreset={selectedPreset} handleDateSegment={handleDateSegment}/>
                        </Stack>
                        <Tooltip label="Switch to calendar">
                            <ActionIcon onClick={() => setCalendar(!calendar)} className="calendarbutton" variant="outline">
                                <AiOutlineCalendar/>
                            </ActionIcon>
                        </Tooltip>
                    </>
                )
        }
    }


    // Object return
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