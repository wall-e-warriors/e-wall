import React, { useEffect, useState } from 'react';
import EditMilestone from './EditMilestone';
import CreateMilestone from './CreateMilestone';
import MilestoneView from './MilestoneView';
import * as actions from './MilestoneActions';

function Milestone() {
  const [response, setResponse] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [createMode, setCreateMode] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    actions.getMilestones().then(responseData => {
      setResponse((responseData || {}).milestones);
    });
  }, []);

  function onCreate(createData) {
    response.push(createData);
    setResponse(response);
    setCreateMode(false);
    actions.createMilestone(createData);
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
    actions.updateMilestone(data);
  }

  function onCancel() {
    setEditMode(false);
  }

  function onDelete(deleteData) {
    setResponse(response.filter(r => r.id !== deleteData.id));
    setEditMode(false);
    actions.deleteMilestone(deleteData.id);
  }

  function listMilestones() {
    return (
      <MilestoneView
        response={response}
        setCreate={() => setCreateMode(true)}
        setEditMode={enterEditMode}
      />
    );
  }

  function editView() {
    return (
      <EditMilestone
        milestone={editData}
        onUpdate={onUpdate}
        onCancel={onCancel}
        deleteMilestone={() => onDelete(editData)}
      />
    );
  }

  function createView() {
    return <CreateMilestone onCreate={onCreate} />;
  }

  let currentView = <div>Loading...</div>;
  if (createMode) {
    currentView = createView();
  } else if (editMode) {
    currentView = editView();
  } else {
    currentView = listMilestones();
  }
  return <div>{currentView}</div>;
}

export default Milestone;
