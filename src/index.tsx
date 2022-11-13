import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import axios from 'axios';

import { store } from './app/store';
import reportWebVitals from './reportWebVitals';
import './index.scss';
import Routes from './Routes';

axios.defaults.baseURL = process.env.REACT_APP_API_URL || '';

const container = document.getElementById('root')!;
const root = createRoot(container);

//  </React.StrictMode> turned off to not make requests twice. Should be done implemented usually.
root.render(
  <Provider store={store}>
    <Routes />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
