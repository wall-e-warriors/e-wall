import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

function Header() {
  return (
    <div>
      <AppBar position="static" color="primary">
        <Toolbar>E-Wall</Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
