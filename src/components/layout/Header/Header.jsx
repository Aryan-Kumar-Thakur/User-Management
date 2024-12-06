import React from 'react';
import './header.css'
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';

const Header = () => {
    const navigate = useNavigate()
    const alert = useAlert()
    const logoutHandler = () => {
        localStorage.removeItem("token")
        alert.success("logout Successfully")
        navigate("/login")
    }
    return (
        <header>
            <h1 className='title'>User Management</h1>
            <button onClick={logoutHandler} className='headerbtn'>Logout</button>
        </header>
    )
}

export default Header