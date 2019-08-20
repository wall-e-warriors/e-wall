import React, { useState } from 'react';
import TimeOffView from './TimeOffView';
import CreateTimeOff from './CreateTimeOff';
import * as actions from './TimeOffActions';

function TimeOff() {
  const [createMode, setCreateMode] = useState(false);
  const [result, setResult] = useState(actions.getAllActivities());

  function onCreate(createData) {
    setCreateMode(false);
  }

  function onSelection(isActivity, selection, startDate, endDate) {
    if (isActivity) {
      const result = actions.getParticipants(selection, startDate, endDate);
      setResult(result);
    } else {
      const result =
        selection === 'All Activity'
          ? actions.getAllActivities()
          : actions.getActivities(selection, startDate, endDate);
      setResult(result);
    }
  }

  function displayTimeOffView() {
    return (
      <TimeOffView
        response={result}
        setSelection={(isActivity, selection, startDate, endDate) =>
          onSelection(isActivity, selection, startDate, endDate)
        }
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
