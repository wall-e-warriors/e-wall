import React from 'react';
import ReactDOM from 'react-dom';
import { StylesProvider } from '@material-ui/styles';
import './index.css';
import App from "./auth/App";
import { AppProvider } from "./auth/AppProvider";

ReactDOM.render(
  <StylesProvider injectFirst>
    <AppProvider>
      <App />
    </AppProvider>
  </StylesProvider>,
  document.getElementById('root'),
);
