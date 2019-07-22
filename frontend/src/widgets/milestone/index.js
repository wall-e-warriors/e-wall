import React, { useState } from 'react';
import EditMilestone from './EditMilestone';
import CreateMilestone from './CreateMilestone';
import MilestoneView from './MilestoneView';

function Milestone() {
  const [mockResponse, setMockResponse] = useState([
    {
      id: 1,
      date: '2019-09-12',
      description: 'Here is the first milestone'
    },
    {
      id: 2,
      date: '2019-09-25',
      description: 'Here is the second milestone'
    }
  ]);
  const [edit, setEdit] = useState(false);
  const [create, setCreate] = useState(false);
  const [editData, setEditData] = useState(null);
  const [createData, setCreateData] = useState(null);

  return (
    <div >
      {!edit && !create && (
        <MilestoneView
          mockResponse={mockResponse}
          deleteMilestone={id =>
            deleteMilestone(id, mockResponse, setMockResponse)
          }
          setCreate={() => setCreate(true)}
          setEditMode={response => setEditMode(setEdit, response, setEditData)}
        />
      )}
      {edit && (
        <EditMilestone
          milestone={editData}
          onEdit={() =>
            onEdit(setEdit, editData, mockResponse, setMockResponse)
          }
          handleChange={(field, value) =>
            setEditData({ ...editData, [field]: value })
          }
        />
      )}
      {create && (
        <CreateMilestone
          onCreate={() =>
            onCreate(
              createData,
              setCreateData,
              setCreate,
              mockResponse,
              setMockResponse
            )
          }
          handleCreate={(field, value) =>
            handleCreate(createData, field, setCreateData, value)
          }
        />
      )}
    </div >
  );
}

function handleCreate(createData, field, setCreateData, value) {
  setCreateData({ ...createData, [field]: value });
}

function setEditMode(setEdit, editData, setEditData) {
  setEditData(editData);
  setEdit(true);
}

function onEdit(setEdit, editData, mockResponse, setMockResponse) {
  const index = mockResponse.findIndex(r => r.id === editData.id);
  mockResponse[index] = editData;
  setMockResponse(mockResponse);
  setEdit(false);
}

function onCreate(createData,
                  setCreateData,
                  setCreate,
                  mockResponse,
                  setMockResponse) {
  mockResponse.push(createData);
  setMockResponse(mockResponse);
  setCreateData(null);
  setCreate(false);
}

function deleteMilestone(id, mockResponse, setMockResponse) {
  setMockResponse(mockResponse.filter(r => r.id !== id));
}

export default Milestone;
