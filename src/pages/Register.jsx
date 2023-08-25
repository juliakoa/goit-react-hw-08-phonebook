import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import css from './Register.module.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registrationError, setRegistrationError] = useState('');

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
        'https://connections-api.herokuapp.com/users/signup',
        formData
      );

      if (response.status === 201) {
        setRegistrationSuccess(true);
      } else {
        setRegistrationError(response.data.message || 'Registration error');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setRegistrationError('Registration error');
    }
  };

  return (
    <div className={css['register-containter']}>
      <h2>Register</h2>
      {registrationSuccess ? (
        <p>
          Registration successful! Please <Link to="/login">login</Link>.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className={css['register-form']}>
          <input
            type="text"
            name="name"
            placeholder="Username"
            value={formData.name}
            onChange={handleChange}
            className={css['register-input']}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={css['register-input']}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={css['register-input']}
          />
          <button type="submit" className={css['register-button']}>
            Register
          </button>
        </form>
      )}
      {registrationError && <p>{registrationError}</p>}
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
