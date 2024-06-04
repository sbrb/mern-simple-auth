import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../redux/userSlice';
import Navigation from '../components/Navigation';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const token = document.cookie.split(';').find(item => item.trim().startsWith('token='));
    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, [token, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, password })).then(() => {
            navigate('/');
        });
    };

    return (
        <div className="auth-container">
            <Navigation />
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
