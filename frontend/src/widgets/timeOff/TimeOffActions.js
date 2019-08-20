import { convertToArray } from '../../utils';

export function getAllActivities() {
  const result = [
    ['All Activity', 'Hours per Day', { type: 'string', role: 'tooltip' }],
  ];
  let allActivities = {
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
  allActivities.activities.forEach(response =>
    result.push(
      convertToArray(response, ['name', 'totalHours'], 'participants'),
    ),
  );
  return result;
}

export function getActivities(participantName, startDate, endDate) {
  const result = [['Activity', 'Hours per Day']];
  let activities = {
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
  activities.activities.forEach(response =>
    result.push(convertToArray(response, ['name', 'hours'], '')),
  );
  return result;
}

export function getParticipants(activityName, startDate, endDate) {
  const result = [['Person', 'Hours per Day']];
  let participants = {
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
  };
  participants.participants.forEach(response =>
    result.push(convertToArray(response, ['name', 'hours'], '')),
  );
  return result;
}
