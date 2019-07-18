import React from 'react';
import PropTypes from 'prop-types';
import { Card } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import styles from './Widgets.module.css';

export default function Widget() {
  return (
    <Card className={styles.something} >
      <CardHeader >Title goes here..</CardHeader >
      <CardContent >
        <List >
          <ListItemText >
            Widget ID: {Math.random().toFixed(2)}
          </ListItemText >
        </List >
      </CardContent >
    </Card >
  )
}

Widget.propTypes = {
  cols: PropTypes.number
};