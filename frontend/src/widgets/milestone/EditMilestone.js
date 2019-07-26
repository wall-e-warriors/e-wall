import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { CardContent } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import DeleteIcon from '@material-ui/icons/Delete';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import * as PropTypes from 'prop-types';
import style from './Milestone.module.css';
import { format } from "date-fns";

const ISO_FORMAT = 'yyyy-MM-dd';

function EditMilestone(props) {
  const [editData, setEditData] = useState(props.milestone);

  return (
    <Slide direction="right" in={true}>
      <CardContent>
        <form>
          <div>
            <TextField
              className={style.textItem}
              id="description"
              required
              rows="4"
              variant="outlined"
              label="Description"
              margin="dense"
              multiline
              value={editData['description']}
              onChange={e =>
                setEditData({ ...editData, description: e.target.value })
              }
            />
          </div>
          <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                variant="inline"
                autoOk
                className={style.textItem}
                inputVariant="outlined"
                margin="dense"
                label="Date"
                disablePast
                disableToolbar
                value={editData['date']}
                onChange={value => setEditData({ ...editData, date: format(value, ISO_FORMAT) })}
              />
            </MuiPickersUtilsProvider>
          </div>
          <div className={style.buttonContainer}>
            <Button
              id="confirm"
              color="primary"
              variant="contained"
              onClick={() => {
                props.onUpdate(editData);
              }}
            >
              Update
            </Button>
            <Button
              id="cancel"
              color="inherit"
              variant="contained"
              onClick={() => {
                props.onCancel();
              }}
            >
              Cancel
            </Button>
          </div>
          <div className={style.deleteButton}>
            <Button
              id="delete"
              color="secondary"
              variant="contained"
              onClick={() => props.deleteMilestone(editData.id)}
            >
              Delete
              <DeleteIcon color="inherit" />
            </Button>
          </div>
        </form>
      </CardContent>
    </Slide>
  );
}

EditMilestone.propTypes = {
  milestone: PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  deleteMilestone: PropTypes.func.isRequired,
};
export default EditMilestone;
