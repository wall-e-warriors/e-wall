import React, { useState } from 'react';
import TimeOffView from './TimeOffView';
import CreateTimeOff from './CreateTimeOff';

function TimeOff() {
  const [createMode, setCreateMode] = useState(false);

  function onCreate(createData) {
    setCreateMode(false);
  }

  function displayTimeOffView() {
    return <TimeOffView setCreate={() => setCreateMode(true)} />;
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
