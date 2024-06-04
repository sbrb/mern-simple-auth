import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../redux/userSlice';
import Navigation from '../components/Navigation';
const Register = () => {
    const [name, setName] = useState('');
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
        dispatch(registerUser({ name, email, password })).then(() => {
            navigate('/');
        });
    };

    return (
        <div className="auth-container">
            <Navigation />
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
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
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
