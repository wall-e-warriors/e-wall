import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import { CardContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
  const [edit, setEdit] = useState(false)
  const [create, setCreate] = useState(false)
  const [editData, setEditData] = useState(null)
  const [createData, setCreateData] = useState(null)

  return (
  <div>
    { !edit && !create && <Card className={styles.card}>
      <CardContent>
       <div className={styles.create}> <AddIcon color="primary" onClick={() => setCreate(!create)}/> </div>
        <List>
            { mockResponse.map(response => (
                cardInfo(response, mockResponse, setMockResponse, edit, setEdit, setEditData)
            ))}
        </List>
      </CardContent>
    </Card> }
     { edit && editForm(edit, setEdit, editData, setEditData, mockResponse, setMockResponse) }
     { create && createForm(createData, setCreateData, create, setCreate, mockResponse, setMockResponse) }
  </div>
  );
}

function del(id, mockResponse, setMockResponse) {
    setMockResponse(mockResponse.filter(r => r.id !== id))
}

function createForm(createData, setCreateData, create, setCreate, mockResponse, setMockResponse) {
  return(
    <div>
      <form noValidate autoComplete="off">
         <div>
             <TextField
                 id="description"
                 required
                 onChange={(e) => handleCreate(createData, 'description', setCreateData, e.target.value)}
             />
         </div>
         <div>
             <TextField
                 id="date"
                 required
                 onChange={(e) => handleCreate(createData, 'date', setCreateData, e.target.value)}
             />
         </div>
         <div>
             <Button variant="contained"  onClick = {() => onCreate(createData, setCreateData, create, setCreate, mockResponse, setMockResponse)}>Ok</Button>
         </div>
      </form>
    </div>
    );
}

function handleCreate(createData, field, setCreateData, value ) {
        setCreateData({ ...createData, [field]: value });
}

function cardInfo(response, mockResponse, setMockResponse, edit, setEdit, setEditData) {
  return (
     <ListItem divider={true} key={response.id} className={styles.heading}>
         { !edit &&  <div>
           <Typography> {response.description} </Typography>
           <Typography> {response.date} </Typography>
            <div className={styles.edit}>
               <EditIcon onClick={() => setEditOption(edit, setEdit, response, setEditData)}/>
               <DeleteIcon color="secondary" onClick={() => del(response.id,  mockResponse, setMockResponse)}/>
             </div>
        </div>}
      </ListItem>
  );
}

function setEditOption(edit, setEdit, editData, setEditData) {
    setEditData(editData)
    setEdit(!edit)
}

function editForm(edit, setEdit, response, setEditData, mockResponse, setMockResponse) {
  return (
    <div>
     <form noValidate autoComplete="off">
        <div>
            <TextField
                id="description"
                value={response.description}
                onChange={(e) => handleChange(response, 'description', setEditData, e.target.value)}
            />
        </div>
        <div>
            <TextField
                id="date"
                value={response.date}
                onChange={(e) => handleChange(response, 'date', setEditData, e.target.value)}
            />
        </div>
        <div>
            <Button variant="contained"  onClick = {() => onEdit(edit, setEdit, response, mockResponse, setMockResponse)}>Ok</Button>
        </div>
     </form>
    </div>
  );
}

function handleChange(response, field, setEditData, value) {
    setEditData({ ...response, [field]: value });
}

function onEdit(edit, setEdit, response, mockResponse, setMockResponse) {
    var index = mockResponse.findIndex(r => r.id === response.id);
    mockResponse[index] = response
    setMockResponse(mockResponse)
    setEdit(!edit)
}

function onCreate(createData, setCreateData, create, setCreate, mockResponse, setMockResponse) {
    mockResponse.push(createData)
    setMockResponse(mockResponse)
    setCreateData(null)
    setCreate(!create)
}

export default Milestone;
