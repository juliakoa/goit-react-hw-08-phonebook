import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './store/contactSlice';
import App from 'components/App';
import filterReducer from './store/filterSlice';

const store = configureStore({
  reducer: {
    contacts: rootReducer,
    filter: filterReducer,
  },
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
