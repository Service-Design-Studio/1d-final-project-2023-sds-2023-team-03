import React from 'react'
import ReactDOM from 'react-dom/client'
import Categories from './views/Categories.jsx'
import Sidebar from './components/Sidebar.jsx'
import Header from './components/header.jsx'
import { Stack } from '@mantine/core'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Sidebar/>
    <Header/>
    <Categories/>
  </React.StrictMode>,
)
