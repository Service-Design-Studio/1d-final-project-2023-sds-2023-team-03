import { Routes, Route } from 'react-router-dom'
import Categories from './views/Categories.jsx'

function Router() {
    return (
        <>
            <Routes>
                <Route path="/sales" element={<Categories/>}/>
            </Routes>
        </>
    )
}

export default Router