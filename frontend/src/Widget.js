import React from 'react';
import PropTypes from 'prop-types';
import { Card } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import styles from './Widgets.module.css';

export default function Widget(props) {
  return (
    <div >
      <div className={styles.cardHeader}>
        {props.title}
      </div>
      <Card className={styles.card} >
        <CardContent >
          <List >
            <ListItemText >
              Widget ID: {Math.random().toFixed(2)}
            </ListItemText >
          </List >
        </CardContent >
      </Card >
    </div >
  )
}

Widget.propTypes = {
  cols: PropTypes.number
};