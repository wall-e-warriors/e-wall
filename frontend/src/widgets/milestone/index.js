import React, {useEffect, useState} from 'react';
import EditMilestone from './EditMilestone';
import CreateMilestone from './CreateMilestone';
import MilestoneView from './MilestoneView';

function Milestone() {
  const [response, setResponse] = useState([]);

  useEffect(() => {
    fetch('/milestone/get')
      .then(response => { return response.json();})
      .then(responseData => { setResponse(responseData.milestones) })
      .catch(function(err) {
        console.log(err);
      })
    }, []);

  const [edit, setEdit] = useState(false);
  const [create, setCreate] = useState(false);
  const [editData, setEditData] = useState(null);

  function onCreate(createData) {
    response.push(createData);
    setResponse(response);
    setCreate(false);
  }

  function setEditMode(editData) {
    setEditData(editData);
    setEdit(true);
  }

  function onEdit(editData) {
    const index = response.findIndex(r => r.id === editData.id);
    response[index] = editData;
    setResponse(response);
    setEdit(false);
  }

  function onDelete(deleteData) {
    setResponse(response.filter(r => r.id !== deleteData.id));
    setEdit(false);
  }

  return (
    <div>
      {!edit && !create && (
        <MilestoneView
          response={response}
          setCreate={() => setCreate(true)}
          setEditMode={response => setEditMode(response)}
        />
      )}
      {edit && (
        <EditMilestone
          milestone={editData}
          onEdit={onEdit}
          deleteMilestone={() => onDelete(editData)}
        />
      )}
      {create && (
        <CreateMilestone
          onCreate={(createData) => onCreate(createData)}
        />
      )}
    </div>
  );
}

export default Milestone;
