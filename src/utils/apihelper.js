function get(url) {
  return new Promise(function(resolve, reject) {
    const req = new XMLHttpRequest();
    req.onreadystatechange = function() {
      if (req.readyState === XMLHttpRequest.DONE) {
        if (req.status === 200) {
          resolve(req.response);
        } else {
          reject(Error(req.statusText));
        }
      }
    }
    req.open('GET', url);
    req.send();
  });
}

function put(url, data) {
  return new Promise(function(resolve, reject) {
    const req = new XMLHttpRequest();
    req.onreadystatechange = function() {
      if (req.readyState === XMLHttpRequest.DONE) {
        if (req.status === 200) {
          resolve(req.response);
        } else {
          reject(Error(req.statusText));
        }
      }
    }
    req.open('PUT', url);
    req.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    req.send(JSON.stringify(data));
  });
}

function del(url) {
  return new Promise(function(resolve, reject) {
    const req = new XMLHttpRequest();
    req.onreadystatechange = function() {
      if (req.readyState === XMLHttpRequest.DONE) {
        if (req.status === 200) {
          resolve(req.response);
        } else {
          reject(Error(req.statusText));
        }
      }
    }
    req.open('DELETE', url);
    req.send();
  })
}

function getJSON(url) {
  return get(url).then(JSON.parse);
}

function getMovements() {
  return getJSON('/movements');
}

function getMovementLogs(date) {
  if (date != null) {
    return getJSON('/movementlogs/' + date.toISOString());
  }
  return getJSON('/movementlogs');
}

function addMovement(movementId, workoutDate) {
  return put('/movementlogs/' + workoutDate.toISOString() + '/' + movementId).then(JSON.parse);
}

function addSet(movementId, workoutDate, weight, reps, index) {
  let data = {
    weight: weight,
    reps: reps,
    index: index
  }
  return put('/movementlogs/' + workoutDate.toISOString() + '/' + movementId, data).then(JSON.parse);
}

function removeSet(movementId, workoutDate, set_id) {
  return del('/movementlogs/' + workoutDate.toISOString() + '/' + movementId + '/' + set_id);
}

function updateSet(movementId, workoutDate, set_id, weight, reps) {
  let data = {
    weight: weight,
    reps: reps
  }
  return put('/movementlogs/' + workoutDate.toISOString() + '/' + movementId + '/' + set_id, data).then(JSON.parse);
}

var api = {
  getMovements: getMovements,
  getMovementLogs: getMovementLogs,
  addMovement: addMovement,
  addSet: addSet,
  removeSet: removeSet,
  updateSet: updateSet
}

export default api;
