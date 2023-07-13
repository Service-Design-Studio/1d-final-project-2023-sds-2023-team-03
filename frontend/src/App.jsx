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
        axios.delete('http://127.0.0.1:3000/api/v1/session', {withCredentials: true})
            .then((res) => {
                setLoginState({
                    isLoggedIn: false,
                    user: {}
                });
            })
            .catch((err) => console.log("Logout error", err));
    }

    const getLoginStatus = () => {
        axios.get('http://127.0.0.1:3000/api/v1/session', {withCredentials: true})
            .then((res) => {
                console.log(res.status)
                if (res.data.logged_in) {
                    handleLogin(res);
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
          {loginState.isLoggedIn ? <Sidebar handleClearState={handleLogOut}/> : null}
          <Router isLoggedIn={loginState.isLoggedIn} handleLogin={handleLogin}/>
        </BrowserRouter>
    )
}

export default App;