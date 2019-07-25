import React from 'react';
import { CardContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import Calendar from './../../Calendar';
import styles from './Milestone.module.css';
import Fab from "@material-ui/core/Fab";

function MilestoneView(props) {
  return (
    [<CardContent >
      <List >
        {props.response.map(response => (
          cardInfo(response, props)
        ))}
      </List >
    </CardContent >,
      <Fab color="primary" aria-label="Add" className={styles.fab} onClick={() => props.setCreate()}>
        <AddIcon />
      </Fab >
    ]

  );
}

function cardInfo(response, props) {
  return (
    <ListItem divider={true} key={response.milestoneId} className={styles.heading} >
      {<div className={styles.lineItem} >
        <Calendar date={response.date} />
        <Typography className={styles.description} > {response.description} </Typography >
        <div className={styles.edit} >
          <EditIcon onClick={() => props.setEditMode(response)} />
        </div >
      </div >
      }
    </ListItem >
  );
}

export default MilestoneView;
