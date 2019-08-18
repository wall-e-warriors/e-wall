import React, { useState } from 'react';
import Chart from 'react-google-charts';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { format } from 'date-fns';
import Fab from '@material-ui/core/Fab';
import People from '@material-ui/icons/People';
import Divider from '@material-ui/core/Divider';
import AddIcon from '@material-ui/icons/Add';
import * as PropTypes from 'prop-types';
import style from './TimeOff.module.css';

const ISO_FORMAT = 'yyyy-MM-dd';

export default function TimeOffView(props) {
  const response = props.response;
  const [createData, setCreateData] = useState({
    startDate: format(new Date(), ISO_FORMAT),
    endDate: format(new Date(), ISO_FORMAT),
  });

  const chartEvents = [
    {
      eventName: 'select',
      callback({ chartWrapper }) {
        let chartSelection = chartWrapper.getChart().getSelection();
        let selection = response[chartSelection[0].row + 1][0];
        props.setSelection(selection);
      },
    },
  ];

  return (
    <div>
      <div className={style.header}>
        <Fab className={style.fab} color="primary">
          <People />
        </Fab>
        <div className={style.timeOffHeader}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              variant="inline"
              autoOk
              className={style.timeline}
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
              className={style.timeline}
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
      </div>
      <Divider />
      <Chart
        chartType="PieChart"
        data={response}
        options={{
          pieHole: 0.5,
          pieSliceText: 'value',
          legend: { position: 'bottom' },
          width: '100%',
          height: '350',
          chartArea: {
            top: 20,
            width: '100%',
            height: '300',
          },
        }}
        chartEvents={chartEvents}
      />
      <Fab
        color="primary"
        aria-label="Add"
        className={style.add}
        onClick={() => props.setCreate()}
      >
        <AddIcon />
      </Fab>
    </div>
  );
}

TimeOffView.propTypes = {
  setCreate: PropTypes.func.isRequired,
  response: PropTypes.array.isRequired,
  setSelection: PropTypes.func.isRequired,
};
