import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import UserMenu from 'components/UserMenu';
import ContactsComponent from 'components/ContactsComponent/ContactsComponent';
import { selectUser, setUser } from 'store/userSlice';

const PrivateRoute = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  // Ustaw użytkownika w Reduxie, jeśli dostępny w local storage
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
  }, [dispatch]);

  if (!user) {
    return <Navigate to="/register" />;
  }

  return (
    <div>
      <UserMenu user={user} />
      <ContactsComponent />
    </div>
  );
};

export default PrivateRoute;
