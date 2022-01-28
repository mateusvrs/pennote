import React from 'react';
import ReactDOM from 'react-dom';
import './styles/global.scss'
import App from './App';
import { AuthContextProvider } from './contexts/AuthContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
