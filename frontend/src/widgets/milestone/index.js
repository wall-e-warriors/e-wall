import React, { useEffect, useState } from 'react';
import EditMilestone from './EditMilestone';
import CreateMilestone from './CreateMilestone';
import MilestoneView from './MilestoneView';
import { getMilestones } from "./MilestoneActions";

function Milestone() {
  const [response, setResponse] = useState([]);

  useEffect(() => {
    getMilestones().then(responseData => {
      setResponse(responseData.milestones)
    })
      .catch(function (err) {
        console.log(err);
      })
  }, []);

  const [editMode, setEditMode] = useState(false);
  const [createMode, setCreateMode] = useState(false);
  const [editData, setEditData] = useState(null);

  function onCreate(createData) {
    response.push(createData);
    setResponse(response);
    setCreateMode(false);
  }

  function enterEditMode(editData) {
    setEditData(editData);
    setEditMode(true);
  }

  function onUpdate(data) {
    const index = response.findIndex(r => r.id === data.id);
    response[index] = data;
    setResponse(response);
    setEditMode(false);
  }

  function onDelete(deleteData) {
    setResponse(response.filter(r => r.id !== deleteData.id));
    setEditMode(false);
  }

  function milestoneList() {
    return <MilestoneView
      response={response}
      setCreate={() => setCreateMode(true)}
      setEditMode={enterEditMode}
    />
  }

  function editView() {
    return <EditMilestone
      milestone={editData}
      onEdit={onUpdate}
      deleteMilestone={() => onDelete(editData)}
    />
  }

  function createView() {
    return <CreateMilestone
      onCreate={onCreate}
    />
  }

  let currentView = <div >Loading...</div >
  if (createMode) {
    currentView = createView()
  } else if (editMode) {
    currentView = editView()
  } else {
    currentView = milestoneList()
  }
  return (
    <div >{currentView}</div >
  );
}

export default Milestone;
