import React, { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

function Home() {
    const navigate = useNavigate();

    const token = document.cookie.split(';').find(item => item.trim().startsWith('token='));
    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);
    return (
        <>
            <NavLink to="/profile" className='btn'>Profile</NavLink>
            <br/>
            <br/>
            <h1>Home</h1>
        </>
    )
}

export default Home