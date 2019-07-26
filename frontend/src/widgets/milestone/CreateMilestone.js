import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import { createMilestone } from "./MilestoneActions";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { format } from "date-fns";
import style from "./Milestone.module.css";
import Slide from "@material-ui/core/Slide";
import * as PropTypes from "prop-types";

const ISO_FORMAT = "yyyy-MM-dd";

export default function CreateMilestone(props) {
  const [createData, setCreateData] = useState({
    date: format(new Date(), ISO_FORMAT)
  });

  return (
    <Slide direction="left" in={true}>
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
              onChange={e =>
                setCreateData({ ...createData, description: e.target.value })
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
                value={createData["date"]}
                onChange={value =>
                  setCreateData({
                    ...createData,
                    date: format(value, ISO_FORMAT)
                  })
                }
              />
            </MuiPickersUtilsProvider>
          </div>
          <div className={style.button}>
            <Button
              id="confirm"
              color="primary"
              variant="contained"
              onClick={() => {
                props.onCreate(createData);
                createMilestone(createData);
              }}
            >
              Create
            </Button>
          </div>
        </form>
      </CardContent>
    </Slide>
  );
}

CreateMilestone.propTypes = {
  onCreate: PropTypes.func
};
