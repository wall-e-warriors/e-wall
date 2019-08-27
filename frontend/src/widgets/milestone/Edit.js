import React, { useEffect, useState } from 'react';
import * as actions from './MilestoneActions';
import MaterialTable from 'material-table';

function Edit() {
  const [response, setResponse] = useState([]);

  useEffect(() => {
    actions.getMilestones().then(responseData => {
      setResponse((responseData || {}).milestones);
    });
  }, []);

  let onUpdate = function(newData, oldData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        {
          const localData = [...response];
          const index = localData.indexOf(oldData);
          localData[index] = newData;
          setResponse(localData);
        }
        resolve();
      }, 1000);
    });
  };


  let onInsert = function(newData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        {
          const localData = [...response];
          localData.push(newData);
          setResponse(localData);
        }
        resolve();
      }, 1000);
    });
  };
  let onDelete = function(oldData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        {
          const localData = [...response];
          const index = localData.indexOf(oldData);
          localData.splice(index, 1);
          setResponse(localData);
        }
        resolve();
      }, 1000);
    });
  };
  return <MaterialTable
    title="Editing Milestones"
    columns={[
      { title: 'Description', field: 'description' },
      { title: 'Date', field: 'date', type: 'date' },
    ]}
    data={response}
    editable={{
      onRowAdd: onInsert,
      onRowUpdate: onUpdate,
      onRowDelete: onDelete,
    }}
  />;
}

export default Edit;