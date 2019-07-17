import React from 'react';
import Card from '@material-ui/core/Card';
import { CardContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import styles from './Milestone.module.css';

function MilestoneView(props) {
  return (
  <div>
    { <Card className={styles.card}>
      <CardContent>
       <div className={styles.create}> <AddIcon color="primary" onClick={() => props.setCreate()}/> </div>
        <List>
            { props.mockResponse.map(response => (
                cardInfo(response, props)
            ))}
        </List>
      </CardContent>
    </Card> }
   </div>
  );
}

function cardInfo(response, props) {
  return (
     <ListItem divider={true} key={response.id} className={styles.heading}>
         { <div>
            <Typography> {response.description} </Typography>
            <Typography> {response.date} </Typography>
            <div className={styles.edit}>
               <EditIcon onClick={() => props.setEditMode(response)}/>
               <DeleteIcon color="secondary" onClick={() => props.deleteMilestone(response.id)}/>
             </div>
            </div>
         }
      </ListItem>
  );
}


export default MilestoneView;
