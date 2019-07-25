import React, {useEffect, useState} from 'react';
import EditMilestone from './EditMilestone';
import CreateMilestone from './CreateMilestone';
import MilestoneView from './MilestoneView';
import {format} from 'date-fns';

function Milestone() {
  const [response, setResponse] = useState([]);

  useEffect(() => {
    fetch('/milestone/get-milestones')
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
    const index = response.findIndex(r => r.milestoneId === editData.milestoneId);
    response[index] = editData;
    setResponse(response);
    setEdit(false);
  }

  return (
    <div>
      {!edit && !create && (
        <MilestoneView
          response={response}
          deleteMilestone={id => setResponse(response.filter(r => r.milestoneId !== id))}
          setCreate={() => setCreate(true)}
          setEditMode={response => setEditMode(response)}
        />
      )}
      {edit && (
        <EditMilestone
          milestone={editData}
          onEdit={(editData) => onEdit(editData)}
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
