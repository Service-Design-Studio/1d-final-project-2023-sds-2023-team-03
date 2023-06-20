import React, {useState} from 'react'
import DateSegment from './DateSegment.jsx'
import CategorySelect from './CategorySelect.jsx'
import { Button, Group, ActionIcon, Stack, Space } from '@mantine/core'
import { AiOutlineCalendar } from 'react-icons/ai'
import { GiHamburgerMenu } from 'react-icons/gi'
import { DatePickerInput } from '@mantine/dates'
import './CategorySearch.css'

const CategorySearch = ({handleSalesData}) => {
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

        handleSalesData({
            x:["this", "is", "dummy", "data"],
            y:[5, 6, 7, 8]
        })
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

    function renderDatePick(calendar) {
        switch (calendar) {
            case true:
                return (
                    <>
                        <DatePickerInput
                            type="range"
                            label="Time period"
                            placeholder="Click to choose..."
                            defaultValue={[lastMonth, today]}
                            defaultDate
                            value={calendarDate}
                            maxDate={today}
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
                            <DateSegment savedPreset={selectedPreset} handleDateSegment={handleDateSegment}/>
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