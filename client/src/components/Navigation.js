import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Navigation = () => {
    const location = useLocation();

    return (
        <nav className="navigation">
            <NavLink
                to="/login"
                className={location.pathname === '/login' ? 'active' : ''}
            >
                Login
            </NavLink>
            <NavLink
                to="/register"
                className={location.pathname === '/register' ? 'active' : ''}
            >
                Register
            </NavLink>
        </nav>
    );
};

export default Navigation;
