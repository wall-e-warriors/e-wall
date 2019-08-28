import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import * as actions from './MilestoneActions';

function Edit() {
  const [model, setModel] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    actions.getMilestones().then(responseData => {
      setModel((responseData || {}).milestones);
    });

    setColumns([
      { title: 'Description', field: 'description' },
      { title: 'Date', field: 'date', type: 'date' },
    ]);
  }, []);

  let onUpdate = function(newData, oldData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        {
          const localData = [...model];
          const index = localData.indexOf(oldData);
          localData[index] = newData;
          setModel(localData);
        }
        actions.updateMilestone(newData);
        resolve();
      }, 1000);
    });
  };

  let onInsert = function(newData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        {
          const localData = [...model];
          localData.push(newData);
          setModel(localData);
        }
        actions.createMilestone(newData);
        resolve();
      }, 1000);
    });
  };

  let onDelete = function(oldData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        {
          const localData = [...model];
          const index = localData.indexOf(oldData);
          localData.splice(index, 1);
          setModel(localData);
        }
        actions.deleteMilestone(oldData.id);
        resolve();
      }, 1000);
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
    />
  );
}

export default Edit;
