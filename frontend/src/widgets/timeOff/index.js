import React, { useState } from 'react';
import { convertToArray } from '../../utils';
import TimeOffView from './TimeOffView';
import CreateTimeOff from './CreateTimeOff';
import * as actions from './TimeOffActions';

function TimeOff() {
  const [createMode, setCreateMode] = useState(false);
  const [result, setResult] = useState(buildAllResult());

  function onCreate(createData) {
    setCreateMode(false);
  }

  function onSelection(selectionType, selection) {
    if (selectionType !== 'Person') {
      const result = fetchPersonData(selection);
      setResult(result);
    } else {
      const result = fetchActivityData(selection);
      setResult(result);
    }
  }

  function fetchPersonData(selection) {
    const result = [['Person', 'Hours per Day']];
    actions
      .getParticipants(selection)
      .participants.forEach(response =>
        result.push(convertToArray(response, ['name', 'hours'], '')),
      );
    return result;
  }

  function fetchActivityData(selection) {
    const result = [['Activity', 'Hours per Day']];
    actions
      .getActivities(selection)
      .activities.forEach(response =>
        result.push(convertToArray(response, ['name', 'hours'], '')),
      );
    return result;
  }

  function buildAllResult() {
    const result = [
      ['All Activity', 'Hours per Day', { type: 'string', role: 'tooltip' }],
    ];
    actions
      .getAllActivities()
      .activities.forEach(response =>
        result.push(
          convertToArray(response, ['name', 'totalHours'], 'participants'),
        ),
      );
    return result;
  }

  function displayTimeOffView() {
    return (
      <TimeOffView
        response={result}
        setSelection={selection => onSelection(result[0][0], selection)}
        setCreate={() => setCreateMode(true)}
      />
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
