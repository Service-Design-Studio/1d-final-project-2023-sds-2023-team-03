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
        const diff = (dates[1] - dates[0])/(1000*60*60*24);
        var x; var y;
        if (diff == 30) {
            x = ["thirty", "days", "dummy", "data"];
            y = [1, 2, 3, 4]
        } else if (diff == 7) {
            x = ["seven", "test", "two", "five", "seven", "test", "two", "five"];
            y = [4, 1, 19, 9, 10, 12, 13, 90]
        } else if (diff == 180) {
            x = ["six", "months", "ago", "data", "no", "way"];
            y = [1, 100, 55, 120, 12, 10]
        }


        handleSalesData({
            x: x,
            y: y 
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