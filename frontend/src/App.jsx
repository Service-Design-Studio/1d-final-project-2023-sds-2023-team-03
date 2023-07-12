import React, { useState, useEffect } from 'react'
import Sidebar from './components/sidebar.jsx'
import Header from './components/header.jsx'
import { BrowserRouter } from 'react-router-dom'
import Router from './routes.jsx'
import './index.css'
import axios from 'axios'

function App() {
    const [loginState, setLoginState] = useState({
        isLoggedIn: false,
        user: {}
    })

    const handleLogin = (data) => {
        setLoginState({
            isLoggedIn: true,
            user: data.user
        })
    }

    const handleLogOut = () => {
        setLoginState({
            isLoggedIn: false,
            user: {}
        })
    }

    const getLoginStatus = () => {
        axios.get('http://localhost:3000/api/v1/logged_in', {withCredentials: true})
            .then((res) => {
                if (res.data.logged_in) {
                    handleLogin(res);
                } else {
                    handleLogOut;
                }
            })
            .catch((err) => console.log("Login error", err))
    }

    useEffect(() => {
        getLoginStatus();
    })

    return(
    <BrowserRouter>
      <Header/>
      <Sidebar/>
      <Router/>
    </BrowserRouter>
    )
}

export default App;