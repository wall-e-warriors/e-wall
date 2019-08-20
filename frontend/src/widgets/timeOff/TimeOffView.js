import React, { useState } from 'react';
import Chart from 'react-google-charts';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { format } from 'date-fns';
import Fab from '@material-ui/core/Fab';
import Divider from '@material-ui/core/Divider';
import AddIcon from '@material-ui/icons/Add';
import * as PropTypes from 'prop-types';
import style from './TimeOff.module.css';

const ISO_FORMAT = 'yyyy-MM-dd';

export default function TimeOffView(props) {
  const response = props.response;
  const [selection, setSelection] = useState(response[0][0]);
  const [dates, setDates] = useState({
    startDate: format(new Date(), ISO_FORMAT),
    endDate: format(new Date(), ISO_FORMAT),
  });

  const chartEvents = [
    {
      eventName: 'select',
      callback({ chartWrapper }) {
        let chartSelection = chartWrapper.getChart().getSelection();
        let selection = response[chartSelection[0].row + 1][0];
        setSelection(selection);
        props.setSelection(
          response[0][0] !== 'Person',
          selection,
          dates['startDate'],
          dates['endDate'],
        );
      },
    },
  ];

  return (
    <div>
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
            value={dates['startDate']}
            onChange={date =>
              setDates({
                ...dates,
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
            value={dates['endDate']}
            onChange={date =>
              setDates({
                ...dates,
                endDate: format(date, ISO_FORMAT),
              })
            }
          />
        </MuiPickersUtilsProvider>
        <div className={style.buttonContainer}>
          <Button
            className={style.button}
            id="confirm"
            color="primary"
            variant="contained"
            onClick={() =>
              props.setSelection(
                response[0][0] === 'Person',
                selection,
                dates['startDate'],
                dates['endDate'],
              )
            }
          >
            Ok
          </Button>
          <Button
            id="all"
            className={style.button}
            color="secondary"
            variant="contained"
            onClick={() =>
              props.setSelection(
                false,
                'All Activity',
                dates['startDate'],
                dates['endDate'],
              )
            }
          >
            View All
          </Button>
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
