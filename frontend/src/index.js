import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Dashboard from "./Dashboard";
import { StylesProvider } from "@material-ui/styles";

ReactDOM.render(
  <StylesProvider injectFirst >
    <Dashboard />
  </StylesProvider >
  , document.getElementById('root'));
