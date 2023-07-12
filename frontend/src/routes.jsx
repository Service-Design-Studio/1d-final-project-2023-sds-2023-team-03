import { Routes, Route,useNavigate,useLocation } from 'react-router-dom'
import Sales from './views/Categories.jsx'
import Logistics from './views/Logistics.jsx'
import Home from './views/Home.jsx'
import Login from './views/Login.jsx'
import Header from './components/header.jsx'
import Dropdown from './components/competitor.jsx'
import Competitors from './views/Competitors.jsx'
import Sidebar from './components/sidebar.jsx'


function Router() {


   
    const options = ['Adidas', 'Nike', 'Skechers', 'Under Armour', 'Overall'];
    const location = useLocation();
    const isLoginPage = location.pathname === '/login';

    return (
        <>
          {!isLoginPage && (
            <>
              <Header />
              <Sidebar />
            </>
          )}
    
          <Routes>
            <Route path="/sales" element={<Sales />} />
            <Route path="/merchandising" element={<Logistics />} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            {options.map((option, index) => (
              <Route path={`/competitors/${option}`} element={<Competitors />} />
            ))}
          </Routes>
        </>
      );
    }

export default Router