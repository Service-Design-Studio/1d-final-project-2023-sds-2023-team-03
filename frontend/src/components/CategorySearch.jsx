import React, {useState} from 'react'
import DateSegment from './DateSegment.jsx'
import CategorySelect from './CategorySelect.jsx'
import { Button, Group, ActionIcon, Stack, Space, Tooltip } from '@mantine/core'
import { AiOutlineCalendar } from 'react-icons/ai'
import { GiHamburgerMenu } from 'react-icons/gi'
import { DatePickerInput } from '@mantine/dates'
import axios from "axios"
import './CategorySearch.css'
import ErrorModal from './ErrorModal.jsx'
import { useDisclosure } from '@mantine/hooks'

const CategorySearch = ({handleSalesData}) => {
    const today = new Date();
    const lastWeek = new Date(new Date().setDate(today.getDate() - 7))
    const lastMonth = new Date(new Date().setDate(today.getDate() - 30))
    const lastHalfYear = new Date(new Date().setDate(today.getDate() - 180))
    const lastYear = new Date(new Date().setDate(today.getDate() - 365))


    const [calendar, setCalendar] = useState(false)                     // calendar mode status
    const [presetDate, setPresetDate] = useState([lastMonth, today])    // date preset selection value
    const [selectedPreset, setSelectedPreset] = useState('30d')         // date preset selection
    const [calendarDate, setCalendarDate] = useState([null, null])      // calendar date selection
    const [category, setCategory] = useState("running")                 // category selection
    const [loading, setLoading] = useState(false)                       // search button 
    const [nullCalendar, nullCalendarHandler] = useDisclosure(false);   // calendar input error modal
    const [timeout, timeoutHandler] = useDisclosure(false);             // search timeout error modal
    
    // API call to backend
    async function getProductData() {
        var date;
        if (calendar) {
            date = calendarDate;
        } else {
            date = presetDate;
        }

        const start = `${date[0].getFullYear()}-${date[0].getMonth()+1}-${date[0].getDate()}`;
        const end = `${date[1].getFullYear()}-${date[1].getMonth()+1}-${date[1].getDate()}`;
        return {
            query: await axios.get(
                `https://sds-team3-backend-v4txkfic3a-as.a.run.app/api/v1/products?category=${category}&start=${start}&end=${end}`, 
                {timeout: 10000}
                ), 
            start: start, 
            end: end}
    }

    // Send data to parent node
    function handleOnClick() {
        if (calendar && (calendarDate[0] == null || calendarDate[1] == null)) {
            nullCalendarHandler.open()
            return
        }

        setLoading(true)
        getProductData().then((res) => {
            handleSalesData({
                frequencies: res.query.data.frequencies,
                revenues: res.query.data.revenues,
                types: res.query.data.types,
                start: res.start,
                end: res.end,
                category: category
            })
            setLoading(false)
        }).catch(() => {
            console.log("Error: Failed to receive data.")
            setLoading(false)
            timeoutHandler.open()
        })
        return true;
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
            <Button className="button" onClick={handleOnClick} disabled={loading}>
                Search!
            </Button>
            <ErrorModal opened={nullCalendar} open={nullCalendarHandler.open} close={nullCalendarHandler.close} title="Invalid date" content="Please input a valid date before searching!"/>
            <ErrorModal opened={timeout} open={timeoutHandler.open} close={timeoutHandler.close} title="Search error" content="The server may be down, or you may be having connection issues."/>
        </Stack>
    )
}

export default CategorySearch;