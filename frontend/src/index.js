import React from 'react';
import ReactDOM from 'react-dom';
import { StylesProvider } from '@material-ui/styles';
import './index.css';
import Dashboard from './Dashboard';

ReactDOM.render(
  <StylesProvider injectFirst>
    <Dashboard />
  </StylesProvider>,
  document.getElementById('root'),
);
