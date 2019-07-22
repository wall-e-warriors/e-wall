import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { CardContent } from "@material-ui/core";

function EditMilestone(props) {
  return (
    <CardContent>
        <div>
          <TextField
            id="description"
            value={props.milestone.description}
            onChange={(e) => props.handleChange('description', e.target.value)}
          />
        </div>
        <div>
          <TextField
            id="date"
            value={props.milestone.date}
            onChange={(e) => props.handleChange('date', e.target.value)}
          />
        </div>
        <div>
          <Button
            id="confirm"
            variant="contained"
            onClick={() => props.onEdit()}>Ok</Button>
        </div>
    </CardContent>
  );
}

export default EditMilestone;
