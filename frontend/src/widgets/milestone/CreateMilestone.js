import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CardContent from "@material-ui/core/CardContent";
import style from "./Milestone.module.css";
import {createMilestone} from "./MilestoneActions";

function CreateMilestone(props) {
  const [createData, setCreateData] = useState(null);

  return (
    <CardContent>
      <form noValidate autoComplete="off">
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
            onChange={(e) => setCreateData({...createData, ['description']: e.target.value})}
          />
        </div>
        <div>
          <TextField
            className={style.textItem}
            id="date"
            required
            margin="dense"
            label="Date"
            variant="outlined"
            onChange={(e) => setCreateData({...createData, ['date']: e.target.value})}
          />
        </div>
        <div>
          <Button
            className={style.button}
            id="confirm"
            variant="contained"
            onClick={() => {
              props.onCreate(createData);
              createMilestone(createData)
            }}>Ok</Button>
        </div>
      </form>
    </CardContent>
  );
}

export default CreateMilestone;
