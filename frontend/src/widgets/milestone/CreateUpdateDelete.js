import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import { format, parseISO } from 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import * as PropTypes from 'prop-types';
import * as actions from './MilestoneActions';
import style from './Milestone.module.css';

const ISO_FORMAT = 'yyyy-MM-dd';

function DateEditComponent(props) {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        variant="inline"
        autoOk
        className={style.textItem}
        inputVariant="outlined"
        margin="dense"
        label="Date"
        disableToolbar
        value={props.value}
        onChange={value => props.onChange(format(value, ISO_FORMAT))}
      />
    </MuiPickersUtilsProvider>
  );
}

DateEditComponent.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

function CreateUpdateDelete() {
  const [loading, setDataLoading] = useState(true);
  const [model, setModel] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    actions
      .getMilestones()
      .then(responseData => {
        setModel((responseData || {}).milestones);
        setDataLoading(false);
      })
      .catch(() => setDataLoading(false));

    setColumns([
      { title: 'Description', field: 'description' },
      {
        title: 'Date',
        field: 'date',
        type: 'date',
        render: rowData => format(parseISO(rowData.date), 'dd-MMM-yyyy'),
        editComponent: DateEditComponent,
      },
    ]);
  }, []);

  let onUpdate = function(newData, oldData) {
    return new Promise((resolve, reject) => {
      {
        const localData = [...model];
        const index = localData.indexOf(oldData);
        localData[index] = newData;
        setModel(localData);
      }
      actions.updateMilestone(newData);
      resolve();
    });
  };

  let onInsert = function(newData) {
    return new Promise((resolve, reject) => {
      {
        const localData = [...model];
        localData.push(newData);
        setModel(localData);
      }
      actions.createMilestone(newData);
      resolve();
    });
  };

  let onDelete = function(oldData) {
    return new Promise((resolve, reject) => {
      {
        const localData = [...model];
        const index = localData.indexOf(oldData);
        localData.splice(index, 1);
        setModel(localData);
      }
      actions.deleteMilestone(oldData.id);
      resolve();
    });
  };
  return (
    <MaterialTable
      title="Editing Milestones"
      columns={columns}
      data={model}
      editable={{
        onRowAdd: onInsert,
        onRowUpdate: onUpdate,
        onRowDelete: onDelete,
      }}
      isLoading={loading}
      options={{
        pageSize: 12,
        actionsColumnIndex: 2,
      }}
    />
  );
}

export default CreateUpdateDelete;
