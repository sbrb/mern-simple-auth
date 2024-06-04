import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from './redux/userSlice';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import Home from './Pages/Home';
import './App.css';

const App = () => {
  const dispatch = useDispatch();
  // const { isAuthenticated } = useSelector(state => state.user);

  useEffect(() => {
    const token = document.cookie.split(';').find(item => item.trim().startsWith('token='));
    if (token) {
      dispatch(getMe());
    }
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} /> */}
        {/* <Route path="/" element={<Navigate to="/login" />} /> */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
