import { Routes, Route } from 'react-router-dom'
import Sales from './views/Categories.jsx'
import Logistics from './views/Logistics.jsx'
import Home from './views/Home.jsx'
import Login from './views/Login.jsx'

function Router() {
    return (
        <>
            <Routes>
                <Route path="/sales" element={<Sales/>}/>
                <Route path="/logistics" element={<Logistics/>}/>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>

            </Routes>
        </>
    )
}

export default Router