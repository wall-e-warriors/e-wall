import React from 'react';
import ReactDOM from 'react-dom';
import { StylesProvider } from '@material-ui/styles';
import './index.css';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './auth/AuthProvider';

ReactDOM.render(
  <StylesProvider injectFirst>
    <HashRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </HashRouter>
  </StylesProvider>,
  document.getElementById('root'),
);
