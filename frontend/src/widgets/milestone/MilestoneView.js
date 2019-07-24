import React from 'react';
import { CardContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import styles from './Milestone.module.css';
import { deleteMilestone } from './MilestoneActions';

function MilestoneView(props) {
  return (
    <CardContent >
      <div ><AddIcon color="primary" onClick={() => props.setCreate()} /></div >
      <List >
        {props.response.map(response => (
          cardInfo(response, props)
        ))}
      </List >
    </CardContent >
  );
}

function cardInfo(response, props) {
  return (
    <ListItem divider={true} key={response.milestoneId} className={styles.heading} >
      {<div >
        <Typography > {response.description} </Typography >
        <Typography > {response.date} </Typography >
        <div className={styles.edit} >
          <EditIcon onClick={() => props.setEditMode(response)} />
          <DeleteIcon color="secondary" onClick={() => {
            props.deleteMilestone(response.milestoneId);
            deleteMilestone(response.milestoneId);
          }} />
        </div >
      </div >
      }
    </ListItem >
  );
}

export default MilestoneView;
