import React from 'react';
import { AppBar } from "@material-ui/core";
import styles from './Header.module.css';
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";

function Header() {
  return (
    <div >
      <AppBar className={styles.header} position="static">
        <Toolbar >
          <Typography variant="h4" >
            e-wall
          </Typography >
        </Toolbar >
      </AppBar >
    </div >
  );
}


export default Header;
