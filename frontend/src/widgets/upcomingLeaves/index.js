import React, { useState } from 'react';
import UpcomingLeavesView from './UpcomingLeavesView';

function UpcomingLeaves() {
  const [mockResponse, setMockResponse] = useState([
    {
      id: 1,
      userName: 'amitdash291',
      userFullName: 'Amit Dash',
      startDate: '2019-09-01',
      endDate: '2019-09-03'
    },
    {
      id: 2,
      userName: 'monalisa',
      userFullName: 'Ramya K',
      startDate: '2019-08-28',
      endDate: '2019-09-01'
    }
  ]);

  return <UpcomingLeavesView leavesData={mockResponse} />;
}

export default UpcomingLeaves;
