import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from 'store/userSlice';
import css from './Login.module.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loginError, setLoginError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = event => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const response = await axios.post(
        'https://connections-api.herokuapp.com/users/login',
        formData
      );

      if (response.status === 200) {
        setLoginError('');
        localStorage.setItem('token', response.data.token);

        // Zapisanie całej odpowiedzi w localStorage
        localStorage.setItem('userData', JSON.stringify(response.data));

        dispatch(
          setUser({
            user: response.data.user,
            email: response.data.user.email,
            token: response.data.token,
          })
        );

        navigate('/contacts');
      } else {
        setLoginError('Login error');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('Login error');
    }
  };

  return (
    <div className={css['login-container']}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className={css['login-form']}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
      {loginError && <p>{loginError}</p>}
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
