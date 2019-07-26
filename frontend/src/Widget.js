import React, { useEffect, useState } from 'react';
import * as PropTypes from 'prop-types';
import { Card } from "@material-ui/core";
import styles from './Widgets.module.css';
import { getRandomColor } from "./palette";

export default function Widget(props) {
  const [color, setColor] = useState("black");

  useEffect(() => {
    setColor(getRandomColor())
  }, []);

  return (
    <div className={styles.widget} >
      <div className={styles.cardHeader} style={{ backgroundColor: color }} >
        {props.title}
      </div >
      <Card className={styles.card} >
        {props.render()}
      </Card >
    </div >
  )
}

Widget.propTypes = {
  title: PropTypes.string,
  render: PropTypes.func.isRequired
};