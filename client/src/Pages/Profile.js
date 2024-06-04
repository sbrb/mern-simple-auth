import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/userSlice';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';

const Profile = () => {
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useSelector(state => state.user);
    const navigate = useNavigate()

    const token = document.cookie.split(';').find(item => item.trim().startsWith('token='));
    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);
    const handleLogout = () => {
        dispatch(logout());
        navigate("/login")
    };

    setTimeout(() => {
        if (!isAuthenticated) return <Navigate to="/login" />;
    })

    return (
        <div>
            <h2>Profile</h2>
            <p>Name: {user?.name}</p>
            <p>Email: {user?.email}</p>
            <NavLink to="/" className="back-btn btn">Back</NavLink>
            <button className='btn logout-btn' onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Profile;
