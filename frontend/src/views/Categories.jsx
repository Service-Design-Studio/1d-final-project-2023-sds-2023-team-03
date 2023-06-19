import './Categories.css'
import { Stack } from '@mantine/core'
import 'tailwindcss/tailwind.css';
import CategorySearch from '../components/CategorySearch';

const Categories = () => {
    return(
        <>
            <Stack>
                <h1>Analysis by Category</h1>
                <CategorySearch className="search"/>
            </Stack>
        </>
    )
}

export default Categories