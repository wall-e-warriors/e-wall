import React, { Fragment } from 'react';
import { CardContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import * as PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Calendar from '../../ui/calendar';
import styles from './Milestone.module.css';
import { processData } from './processor';

function MilestoneView(props) {
  let processedResponse = processData(props.response);

  return (
    <Fragment>
      <CardContent className={styles.listView}>
        <List>{processedResponse.map(response => cardInfo(response))}</List>
      </CardContent>
      <Fab
        color="primary"
        aria-label="Edit"
        className={styles.fab}
        onClick={() => props.history.push('/edit')}
      >
        <EditIcon />
      </Fab>
    </Fragment>
  );
}

function cardInfo(response) {
  return (
    <ListItem divider={true} key={response.id} className={styles.heading}>
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
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(MilestoneView);
