import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { CardContent } from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
import style from "./Milestone.module.css";
import { updateMilestone } from './MilestoneActions';
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

function EditMilestone(props) {
  const [editData, setEditData] = useState(props.milestone);

  return (
    <Slide direction="right" in={true} >
      <CardContent >
        <form >
          <div >
            <TextField
              className={style.textItem} id="description"
              required
              rows="4"
              variant="outlined"
              label="Description"
              margin="dense"
              multiline
              value={editData['description']}
              onChange={(e) => setEditData({ ...editData, ['description']: e.target.value })}
            />
          </div >
          <div >
            <MuiPickersUtilsProvider utils={DateFnsUtils} >
              <DatePicker variant="inline"
                          autoOk
                          className={style.textItem}
                          inputVariant="outlined"
                          margin="dense"
                          label="Date"
                          disablePast
                          disableToolbar
                          value={editData['date']}
                          onChange={value => setEditData({ ...editData, ['date']: value })} />
            </MuiPickersUtilsProvider >
          </div >
          <div className={style.button} >
            <Button
              id="confirm"
              color="primary"
              variant="contained"
              onClick={() => {
                props.onEdit(editData);
                updateMilestone(editData)
              }} >Update</Button >
          </div >
        </form >
      </CardContent >
    </Slide >
  );
}

export default EditMilestone;
