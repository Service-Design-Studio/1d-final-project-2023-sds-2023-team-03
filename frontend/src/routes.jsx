import { Routes, Route, Navigate } from 'react-router-dom'
import Sales from './views/Categories.jsx'
import Logistics from './views/Merchandising.jsx'
import Home from './views/Home.jsx'
import Competitors from './views/Competitors.jsx'
import Login from './views/Login.jsx';

function Router({isLoggedIn, handleLogin}) {
    const options = ['Adidas', 'Nike', 'Asics', 'Skechers', 'Overall'];

    return (
        <>
            <Routes>
                <Route path="/sales" element={isLoggedIn ? <Sales/> : <Navigate to="/login"/>}/>
                <Route path="/merchandising" element={isLoggedIn ? <Logistics/> : <Navigate to="/login"/>}/>
                <Route path="/" element={isLoggedIn ? <Navigate to="/home"/> : <Navigate to="/login"/>}/>
                <Route path="/home" element={isLoggedIn ? <Home/> : <Navigate to="/login"/>}/>
                {/*<Route path="/login" element={<Login handleLogin={handleLogin}/>}/>/*/}
                {options.map((option, index) => (
                    <Route key={index} path={`/competitors/:competitorName`} element={isLoggedIn ? <Competitors/> : <Navigate to="/login"/>} />
                ))}
            </Routes>
        </> 
      );
    }

export default Router