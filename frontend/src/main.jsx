import React from 'react'
import ReactDOM from 'react-dom/client'
import Categories from './views/Categories.jsx'
import Sidebar from './components/sidebar.jsx'
import SidebarNew from './components/SidebarNew.tsx'
import Header from './components/header.jsx'
import { BrowserRouter } from 'react-router-dom'
import Router from './routes.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Router/>
    </BrowserRouter>
  </React.StrictMode>
)


