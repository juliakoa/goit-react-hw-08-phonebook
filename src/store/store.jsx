import { configureStore } from '@reduxjs/toolkit';
import contactReducer from './contactSlice';
import filterReducer from './filterSlice';
import userReducer from './userSlice'; // Dodaj import userReducer

const store = configureStore({
  reducer: {
    contacts: contactReducer,
    filter: filterReducer,
    user: userReducer, // Dodaj userReducer do konfiguracji
  },
});

export default store;
