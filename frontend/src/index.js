import React from 'react';
import ReactDOM from 'react-dom';
import { StylesProvider } from '@material-ui/styles';
import './index.css';
import App from './App';
import { AuthProvider } from './auth/AuthProvider';

ReactDOM.render(
  <StylesProvider injectFirst>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StylesProvider>,
  document.getElementById('root'),
);
