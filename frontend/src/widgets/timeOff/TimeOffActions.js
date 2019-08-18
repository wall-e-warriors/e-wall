export function getAllActivities() {
  return {
    activities: [
      {
        name: 'Recruitment',
        totalHours: 12,
        participants: [
          {
            name: 'Harry',
            hours: 4,
          },
          {
            name: 'Sally',
            hours: 8,
          },
        ],
      },
      {
        name: 'Workshop',
        totalHours: 10,
        participants: [
          {
            name: 'Harry',
            hours: 6,
          },
          {
            name: 'Sally',
            hours: 4,
          },
        ],
      },
    ],
  };
}

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
