import React from 'react';
import { CardContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import Calendar from '../../ui/calendar';
import styles from './Milestone.module.css';
import Fab from '@material-ui/core/Fab';
import * as PropTypes from 'prop-types';

export default function MilestoneView(props) {
  return (
    <>
      <CardContent className={styles.listView}>
        <List>
          {props.response.map(response =>
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

function cardInfo(response, setEditMode) {
  return (
    <ListItem divider={true} key={response.id} className={styles.heading}>
      {
        <div className={styles.lineItem}>
          <div className={styles.calendar}>
            <Calendar date={response.date} />
          </div>
          <Typography className={styles.description}>
            {' '}
            {response.description}{' '}
          </Typography>
          <div className={styles.edit}>
            <EditIcon onClick={() => setEditMode(response)} />
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
