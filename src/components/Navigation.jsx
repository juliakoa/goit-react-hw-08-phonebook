import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Dodaj import useSelector
import { selectUser } from 'store/userSlice'; // Dodaj import selectUser
import css from './Navigation.module.css';

const Navigation = () => {
  const user = useSelector(selectUser);
  return (
    <nav className={css.nav}>
      <ul>
        <li>
          <Link to="/register">Register</Link>
        </li>
        {!user ? (
          // Jeśli użytkownik nie jest zalogowany, wyświetl link do logowania
          <li>
            <Link to="/login">Login</Link>
          </li>
        ) : (
          // Jeśli użytkownik jest zalogowany, wyświetl link do kontaktów i wylogowania
          <>
            <li>
              <Link to="/contacts">Contacts</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
