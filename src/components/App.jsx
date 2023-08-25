import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Navigation from './Navigation';
import Register from 'pages/Register';
import Login from 'pages/Login';
import PrivateRoute from 'pages/PrivateRoute';
import Home from 'pages/Home'; // Import komponentu Home
import css from './App.module.css';
import { selectUser, setUser } from 'store/userSlice';

const App = () => {
  const [isEffectCompleted, setIsEffectCompleted] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    if (storedUserData) {
      dispatch(
        setUser({
          user: storedUserData.user,
          email: storedUserData.user.email,
          token: storedUserData.token,
        })
      );
    }
    setIsEffectCompleted(true); // Oznacz efekt jako zakończony
  }, [dispatch]);

  const user = useSelector(selectUser);

  return (
    <div className={css.container}>
      <h1 className={css.title}>Phonebook</h1>
      <Navigation user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {isEffectCompleted && user && (
          <Route path="/contacts" element={<PrivateRoute user={user} />} />
        )}
      </Routes>
    </div>
  );
};

export default App;
