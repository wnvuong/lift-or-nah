function get(url, success, error) {
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

function getJSON(url) {
  return get(url).then(JSON.parse);
}

function getMovements() {
  return getJSON('/movements');
}

var api = {
  getMovements: getMovements
}

export default api;
