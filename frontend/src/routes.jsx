import { Routes, Route, Navigate } from 'react-router-dom'
import Sales from './views/Categories.jsx'
import Logistics from './views/Logistics.jsx'
import Home from './views/Home.jsx'
import Competitors from './views/Competitors.jsx'
import Login from './views/Login.jsx';

function Router({handleLogin}) {

    const options = ['Adidas', 'Nike', 'Asics', 'Skechers', 'Overall'];

    return (
        <>
            <Routes>
                <Route path="/sales" element={<Sales/>}/>
                <Route path="/merchandising" element={<Logistics/>}/>
                <Route path="/" element={<Navigate to="/home"/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/login" element={<Login handleLogin={handleLogin}/>}/>
                {options.map((option, index) => (
                    <Route key={index} path={`/competitors/${option}`} element={<Competitors/>} />
                ))}
            </Routes>



        </>
    )
}

export default Router