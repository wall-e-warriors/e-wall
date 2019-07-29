import React, { useState } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { format } from 'date-fns';
import * as PropTypes from 'prop-types';
import style from './TimeOff.module.css';

const ISO_FORMAT = 'yyyy-MM-dd';

export default function CreateTimeOff(props) {
  //TODO: Use reason from props
  const [reason] = useState(['Leave', 'Workshop', 'Hiring', 'Capability']);
  const [createData, setCreateData] = useState({
    startDate: format(new Date(), ISO_FORMAT),
    endDate: format(new Date(), ISO_FORMAT),
    reason: reason[0],
  });

  return (
    <CardContent>
      <form noValidate autoComplete="off">
        <div>
          <TextField
            className={style.createItem}
            id="name"
            required
            variant="outlined"
            label="Name"
            margin="dense"
            onChange={e =>
              setCreateData({ ...createData, name: e.target.value })
            }
          />
        </div>
        <div>
          <Select
            variant="outlined"
            className={style.createItem}
            value={createData['reason']}
            onChange={e =>
              setCreateData({ ...createData, reason: e.target.value })
            }
            input={<OutlinedInput name="age" />}
          >
            {reason.map(r => (
              <MenuItem key={r} value={r}>
                {r}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div>
          <TextField
            className={style.createItem}
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
        <div className={style.dateContainer}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              variant="inline"
              autoOk
              className={style.createItem}
              inputVariant="outlined"
              margin="dense"
              label="Start Date"
              disablePast
              disableToolbar
              value={createData['startDate']}
              onChange={date =>
                setCreateData({
                  ...createData,
                  startDate: format(date, ISO_FORMAT),
                })
              }
            />
          </MuiPickersUtilsProvider>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              variant="inline"
              autoOk
              className={style.createItem}
              inputVariant="outlined"
              margin="dense"
              label="End Date"
              disablePast
              disableToolbar
              value={createData['endDate']}
              onChange={date =>
                setCreateData({
                  ...createData,
                  endDate: format(date, ISO_FORMAT),
                })
              }
            />
          </MuiPickersUtilsProvider>
        </div>
        <div className={style.button}>
          <Button
            id="create"
            color="primary"
            variant="contained"
            onClick={() => props.onCreate(createData)}
          >
            Create
          </Button>
        </div>
      </form>
    </CardContent>
  );
}

CreateTimeOff.propTypes = {
  onCreate: PropTypes.func,
};
