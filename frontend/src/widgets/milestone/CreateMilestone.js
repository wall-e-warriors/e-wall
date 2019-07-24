import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CardContent from "@material-ui/core/CardContent";

function CreateMilestone(props) {
  const [createData, setCreateData] = useState(null);

  return (
    <CardContent>
      <form noValidate autoComplete="off">
        <div>
          <TextField
            id="description"
            required
            onChange={(e) => setCreateData({...createData, ['description']: e.target.value})}
          />
        </div>
        <div>
          <TextField
            id="date"
            required
            onChange={(e) => setCreateData({...createData, ['date']: e.target.value})}
          />
        </div>
        <div>
          <Button
            id="confirm"
            variant="contained"
            onClick={() => props.onCreate(createData)}>Ok</Button>
        </div>
      </form>
    </CardContent>
  );
}

export default CreateMilestone;
