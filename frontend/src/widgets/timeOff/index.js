import React, { useState } from 'react';
import { convertToArray } from '../../utils';
import TimeOffView from './TimeOffView';
import CreateTimeOff from './CreateTimeOff';
import * as actions from './TimeOffActions';

function TimeOff() {
  const [createMode, setCreateMode] = useState(false);

  function onCreate(createData) {
    setCreateMode(false);
  }

  function displayTimeOffView() {
    const result = [
      ['Task', 'Hours per Day', { type: 'string', role: 'tooltip' }],
    ];
    actions
      .getAllActivities()
      .activities.forEach(response =>
        result.push(
          convertToArray(response, ['name', 'totalHours'], 'participants'),
        ),
      );
    return (
      <TimeOffView response={result} setCreate={() => setCreateMode(true)} />
    );
  }

  function createTimeOff() {
    return <CreateTimeOff onCreate={onCreate} />;
  }

  let currentView = <div>Loading...</div>;
  if (createMode) {
    currentView = createTimeOff();
  } else {
    currentView = displayTimeOffView();
  }
  return <div>{currentView}</div>;
}

export default TimeOff;
