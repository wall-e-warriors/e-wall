import React, { Fragment } from 'react';
import { CardContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import * as PropTypes from 'prop-types';
import Calendar from '../../ui/calendar';
import styles from './Milestone.module.css';
import { processData } from './processor';

export default function MilestoneView(props) {
  let processedResponse = processData(props.response);

  return (
    <Fragment>
      <CardContent className={styles.listView}>
        <List>
          {processedResponse.map(response =>
            cardInfo(response, props.setEditMode),
          )}
        </List>
      </CardContent>
      <Fab
        color="primary"
        aria-label="Add"
        className={styles.fab}
        onClick={props.setCreate}
      >
        <AddIcon />
      </Fab>
    </Fragment>
  );
}

function cardInfo(response, setEditMode) {
  return (
    <ListItem
      divider={true}
      key={response.id}
      className={styles.heading}
      onDoubleClick={() => setEditMode(response)}
    >
      {
        <div className={styles.lineItem}>
          <div className={styles.calendar}>
            <Calendar
              date={response.parsedDate}
              alert={response.reminderText != null}
            />
          </div>
          <div>
            <Typography variant="h6" className={styles.description}>
              {response.description}
            </Typography>
            {response.reminderText && (
              <Typography className={styles.reminderText}>
                {response.reminderText}
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
