import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ItemProvider,} from './context/product'

ReactDOM.render(
  <React.StrictMode>
    <ItemProvider>

    <App />
    </ItemProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
