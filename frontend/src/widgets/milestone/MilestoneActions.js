export function getMilestones() {
  return fetch('/milestone/get')
    .then(response => {
      return response.json();
    })
    .catch(function(err) {});
}

export function createMilestone(milestone) {
  fetch('/milestone/create', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      description: milestone.description,
      date: milestone.date,
    }),
  }).catch(function(err) {});
}

export function updateMilestone(milestone) {
  let { id, description, date } = milestone;
  fetch('/milestone/update', {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
      description,
      date,
    }),
  }).catch(function(err) {});
}

export function deleteMilestone(milestoneId) {
  let url = `/milestone/${milestoneId}/delete`;
  fetch(url, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).catch(function(err) {});
}
