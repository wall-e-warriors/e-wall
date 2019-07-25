import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { CardContent } from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
import { updateMilestone } from './MilestoneActions';

function EditMilestone(props) {
  const [editData, setEditData] = useState(props.milestone);

  return (
    <Slide direction="right" in={true}>
      <CardContent >
        <div >
          <TextField
            id="description"
            value={editData.description}
            onChange={(e) => setEditData({...editData, ['description']: e.target.value})}
          />
        </div >
        <div >
          <TextField
            id="date"
            value={editData.date}
            onChange={(e) => setEditData({...editData, ['date']: e.target.value})}
          />
        </div >
        <div >
          <Button
            id="confirm"
            variant="contained"
            onClick={() => {
              props.onEdit(editData);
              updateMilestone(editData)
            }} >Ok</Button >
        </div >
      </CardContent >
    </Slide >
  );
}

export default EditMilestone;
