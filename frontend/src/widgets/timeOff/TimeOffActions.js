export function getActivities(participantName) {
  return {
    activities: [
      {
        name: 'Recruitment',
        hours: 4,
      },
      {
        name: 'Workshop',
        hours: 6,
      },
    ],
  };
}

export function getParticipants(activityName) {
  return {
    participant: [
      {
        name: 'Harry',
        hours: 4,
      },
      {
        name: 'Sally',
        hours: 8,
      },
    ],
  };
}
