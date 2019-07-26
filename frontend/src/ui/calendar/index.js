import React from 'react';
import styles from './Calendar.module.css'
import { format, parseISO } from 'date-fns';


export default function Index({ date }) {
  let formattedDate = format(new Date(date), 'yyyy-MM-dd')
  let month = format(parseISO(formattedDate), "MMM");
  let day = format(parseISO(formattedDate), "dd");
  return (
    <div className={styles.date} >
      <span className={styles.month} >{month}</span >
      <h1 className={styles.day} >{day}</h1 >
    </div >);
}
