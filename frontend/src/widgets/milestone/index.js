import React, { useState } from 'react';
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
import TextField from '@material-ui/core/TextField';

import styles from './Milestone.module.css';

function Milestone() {
  const [mockResponse, setMockResponse]  = useState([{
                          "id": 1,
                          "date": "2019-09-12",
                          "description": "Here is the first milestone"
                        },{
                          "id": 2,
                          "date": "2019-09-25",
                          "description": "Here is the second milestone"
                        }])

  return (
    <Card className={styles.card}>
      <CardContent>
        <List>
            { mockResponse.map(response => (
                cardInfo(response, mockResponse, setMockResponse)
            ))}
        </List>
      </CardContent>
    </Card>
  );
}

function del(id, mockResponse, setMockResponse) {
    setMockResponse(mockResponse.filter(r => r.id != id))
}

function cardInfo(response, mockResponse, setMockResponse) {
  return (
      <ListItem divider={true} key={response.id} className={styles.heading}>
        <div onMouseEnter= {() => showOptions()}>
           <Typography> {response.description} </Typography>
           <Typography> {response.date} </Typography>
            <div className={styles.edit}>
               <AddIcon color="primary"/>
               <EditIcon onClick={() => editForm(response)}/>
               <DeleteIcon color="secondary" onClick={() => del(response.id,  mockResponse, setMockResponse)}/>
             </div>
        </div>
      </ListItem>
  );
}

function showOptions() {

}

function editForm(response) {
  return (
    <div>
     <form noValidate autoComplete="off">
        <TextField
            id="name"
            label="Name"
            value={response.name}
        />
        <TextField
            id="description"
            label="Name"
            multiline
            value={response.description}
        />
         <TextField
            id="date"
            label="Date"
            value={response.date}
        />
     </form>
    </div>
  );
}

export default Milestone;
