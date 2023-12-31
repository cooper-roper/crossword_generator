// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CrosswordProvider } from './Context/CrosswordContext';
import dotenv from 'dotenv';

dotenv.config();

ReactDOM.render(
  <React.StrictMode>
    <CrosswordProvider>
      <App />
    </CrosswordProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


