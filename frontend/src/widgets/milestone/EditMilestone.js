import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function EditMilestone(props) {
  return (
    <div>
     <form noValidate autoComplete="off">
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
            <Button variant="contained" onClick = {() => props.onEdit()}>Ok</Button>
        </div>
     </form>
    </div>
  );
}
export default EditMilestone;
