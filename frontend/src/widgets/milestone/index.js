import React, { useEffect, useState } from 'react';
import MilestoneView from './MilestoneView';
import * as actions from './MilestoneActions';

function Milestone() {
  const [response, setResponse] = useState([]);

  useEffect(() => {
    actions.getMilestones().then(responseData => {
      setResponse((responseData || {}).milestones);
    });
  }, []);

  function listMilestones() {
    return <MilestoneView response={response} />;
  }

  return <div>{listMilestones()}</div>;
}

export default Milestone;
