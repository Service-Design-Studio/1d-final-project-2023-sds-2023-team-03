import React, {useState} from 'react'
import DateSegment from './DateSegment.jsx'
import CategorySelect from './CategorySelect.jsx'
import { Button, Group, ActionIcon, Stack, Space, Tooltip } from '@mantine/core'
import { AiOutlineCalendar } from 'react-icons/ai'
import { GiHamburgerMenu } from 'react-icons/gi'
import { DatePickerInput } from '@mantine/dates'
import axios from "axios"
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

    async function getProductData() {
        var date;
        if (calendar) {
            date = calendarDate;
        } else {
            date = presetDate;
        }

        const start = `${date[0].getFullYear()}-${date[0].getMonth()+1}-${date[0].getDate()}`;
        const end = `${date[1].getFullYear()}-${date[1].getMonth()+1}-${date[1].getDate()}`;
        return await axios.get(`http://localhost:3000/api/v1/products?category=${category}&start=${start}&end=${end}`)
    }

    function handleOnClick() {
        const dates = (calendar && calendarDate) || presetDate

        if (dates.includes(null)) {
            console.log("invalid")
        } else {
            console.log("valid")
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