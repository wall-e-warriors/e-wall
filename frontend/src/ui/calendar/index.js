import React from 'react';
import { format, parseISO } from 'date-fns';
import PropTypes from 'prop-types';
import styles from './Calendar.module.css';

export default function Calendar({ date, alert = false }) {
  let formattedDate = format(new Date(date), 'yyyy-MM-dd');
  let month = format(parseISO(formattedDate), 'MMM');
  let day = format(parseISO(formattedDate), 'dd');
  let redOrGreenDay = alert ? styles.alertDay : styles.day;
  let redOrGreenMonth = alert ? styles.alertMonth : styles.month;
  return (
    <div className={styles.date}>
      <span className={redOrGreenMonth}>{month}</span>
      <h1 className={redOrGreenDay}>{day}</h1>
    </div>
  );
}

Calendar.propTypes = {
  date: PropTypes.string.isRequired,
  alert: PropTypes.bool,
};
