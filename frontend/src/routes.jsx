import { Routes, Route,useNavigate } from 'react-router-dom'
import Sales from './views/Categories.jsx'
import Logistics from './views/Logistics.jsx'
import Home from './views/Home.jsx'
import Login from './views/Login.jsx'
import Dropdown from './components/competitor.jsx'
import Competitors from './views/Competitors.jsx'

function Router() {


   
    const options = ['Adidas', 'Nike', 'Asics', 'Skechers', 'Overall'];

    return (
        <>
            <Routes>
                <Route path="/sales" element={<Sales/>}/>
                <Route path="/logistics" element={<Logistics/>}/>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                {options.map((option, index) => (
          <Route path={`/competitors/${option}`} element={ <Competitors/> } />
        ))}
            </Routes>



        </>
    )
}

export default Router