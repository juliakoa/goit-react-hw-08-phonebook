import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { clearUser } from 'store/userSlice'; // Użyj clearUser zamiast logoutUser
import { selectUser } from 'store/userSlice';
import css from './UserMenu.module.css';

const UserMenu = ({ handleLogout }) => {
  // Popraw deklarację props
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Użyj useSelector do pobrania stanu użytkownika z Reduxa
  const user = useSelector(selectUser);

  const handleUserLogout = () => {
    dispatch(clearUser()); // Użyj clearUser zamiast logoutUser
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    // Wywołaj funkcję przekazaną jako props
    navigate('/'); // Przekierowanie na stronę logowania
  };

  return (
    <div className={css['user-menu']}>
      <p>{user?.email}</p>
      <button onClick={handleUserLogout} className={css['logout-button']}>
        Logout
      </button>
    </div>
  );
};

export default UserMenu;
