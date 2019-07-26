import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { StylesProvider } from '@material-ui/styles';
import Dashboard from './Dashboard';

ReactDOM.render(
  <StylesProvider injectFirst>
    <Dashboard />
  </StylesProvider>,
  document.getElementById('root'),
);
