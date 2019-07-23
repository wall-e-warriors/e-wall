import React from 'react';
import styles from './Calendar.module.css'
import { format, parseISO } from 'date-fns';


export default function Calendar({ date }) {
  let month = format(parseISO(date), "MMM");
  let day = format(parseISO(date), "dd");
  return (
    <div className={styles.date} >
      <span className={styles.month} >{month}</span >
      <h1 className={styles.day} >{day}</h1 >
    </div >);
}
