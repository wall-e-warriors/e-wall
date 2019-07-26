import React from 'react';
import { CardContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import * as PropTypes from 'prop-types';
import {
  parseISO,
  differenceInCalendarDays,
  formatDistance,
  isPast,
} from 'date-fns';
import Calendar from '../../ui/calendar';
import styles from './Milestone.module.css';

export default function MilestoneView(props) {
  let sortedResponse = props.response
    .filter(item => !isPast(parseISO(item.date)))
    .sort((a, b) => parseISO(a.date) - parseISO(b.date));

  return (
    <>
      <CardContent className={styles.listView}>
        <List>
          {sortedResponse.map(response =>
            cardInfo(response, props.setEditMode),
          )}
        </List>
      </CardContent>
      <Fab
        color="primary"
        aria-label="Add"
        className={styles.fab}
        onClick={() => props.setCreate()}
      >
        <AddIcon />
      </Fab>
    </>
  );
}

function getReminderText(date) {
  let eventDate = parseISO(date);
  let difference = differenceInCalendarDays(eventDate, new Date());
  if (difference < 10) {
    return formatDistance(eventDate, new Date(), { addSuffix: true });
  }
  return null;
}

function cardInfo(response, setEditMode) {
  let reminderText = getReminderText(response.date);
  return (
    <ListItem
      divider={true}
      key={response.id}
      className={styles.heading}
      onHover
      onDoubleClick={() => setEditMode(response)}
    >
      {
        <div className={styles.lineItem}>
          <div className={styles.calendar}>
            <Calendar date={response.date} alert={reminderText != null} />
          </div>
          <div>
            <Typography className={styles.description}>
              {response.description}
            </Typography>
            {reminderText && (
              <Typography className={styles.reminderText}>
                {reminderText}
              </Typography>
            )}
          </div>
        </div>
      }
    </ListItem>
  );
}

MilestoneView.propTypes = {
  response: PropTypes.array.isRequired,
  setCreate: PropTypes.func.isRequired,
  setEditMode: PropTypes.func.isRequired,
};
