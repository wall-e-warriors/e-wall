import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import { CardContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import {
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons';
import styles from './Milestone.module.css';

const apiStatus = {
  SUCCESS: 'success',
  LOADING: 'loading',
  FAILURE: 'failure'
};

function Milestone() {
  const [status, setStatus] = useState(apiStatus.LOADING);
  const mockResponse = [{
                          "name": "Milestone 1",
                          "date": "2019-09-12",
                          "description": "Here is the description of first milestone"
                        },{
                          "name": "Milestone 2",
                          "date": "2019-09-25",
                          "description": "Here is the description of next milestone"
                        }]


  useEffect(() => {
    fetch('/healthcheck').then(response => {
      response.ok ? setStatus(apiStatus.SUCCESS) : setStatus(apiStatus.FAILURE);
    });
  }, []);

  return (
    <List>
        {mockResponse.map(response => (
              generateMilestoneItem(status, response)
         ))}
    </List>
  );
}


function generateMilestoneItem(status, response) {
  return(
    <ListItem>
      <Card>
        <CardContent className={styles.heading}>
          { messsageBasedOnStatus(status, response) }
          <div className={styles.edit}>
            <AddIcon color="primary"/>
            <EditIcon/>
            <DeleteIcon color="secondary"/>
          </div>
        </CardContent>
      </Card>
    </ListItem>
  );
}

function messsageBasedOnStatus(status, response) {
  switch (status) {
    case apiStatus.SUCCESS:
      return successMessage(response);
    case apiStatus.FAILURE:
      return errorMessage();
    default:
      return <div>Loading...</div>;
  }
}

function successMessage(response) {
  return (
    <div>
       <Typography> {response.name} </Typography>
       <Typography> {response.description} </Typography>
       <Typography> {response.date} </Typography>
    </div>
  );
}

function errorMessage() {
  return (
    <div className={styles.center}>
      <FontAwesomeIcon size="2x" color="red" icon={faTimesCircle} />
    </div>
  );
}

export default Milestone;
