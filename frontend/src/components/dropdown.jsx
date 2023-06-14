import { useState } from 'react'
function Dropdown() {
    const values = [
        {label: "TestOne", value: "test1"},
        {label: "TestTwo", value: "test2"},
        {label: "TestThree", value: "test3"}
    ]

    const [value, setValue] = useState('test1')

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    return(
        <div>
            <select value = {value} onChange = {handleChange}>
                {
                    values.map((v) => (
                        <option value = {v.value}>{v.label}</option>
                    ))
                }
            </select>
            <p>You have selected: {value}.</p>
        </div>
    )
}

export default Dropdown;