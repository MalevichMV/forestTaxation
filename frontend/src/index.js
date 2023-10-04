import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/style.scss';
import App from './Components/app/App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import store from './store/store'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
