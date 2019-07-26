export function createMilestone(milestone) {
  fetch('/milestone/create', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      description: milestone.description,
      date: milestone.date
    })
  }).catch(function(err) {
    console.log(err);
  })
}

export function updateMilestone(milestone) {
  fetch('/milestone/update', {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      milestoneId: milestone.milestoneId,
      description: milestone.description,
      date: milestone.date
    })
  }).catch(function(err) {
    console.log(err);
  })
}

export function deleteMilestone(milestoneId) {
  let url = `/milestone/${milestoneId}/delete`;
  fetch(url, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  }).catch(function(err) {
    console.log(err);
  })
}