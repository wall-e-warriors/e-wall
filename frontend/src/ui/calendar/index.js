import React from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import styles from './Calendar.module.css';

export default function Calendar({ date, alert = false }) {
  let month = format(date, 'MMM');
  let day = format(date, 'dd');
  return (
    <div className={`${styles.date} ${alert ? styles.alert : styles.normal}`}>
      <span className={styles.month}>{month}</span>
      <h1 className={styles.day}>{day}</h1>
    </div>
  );
}

Calendar.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  alert: PropTypes.bool,
};
