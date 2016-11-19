const MongoClient = require('mongodb').MongoClient;
const MongoHelper = require('./app/mongohelper.js');
const express = require('express');
const bodyParser = require('body-parser');
const assert = require('assert');
const app = express();
const url = 'mongodb://localhost:27017/lift-or-nah';

let database = null;

app.use(express.static('build'));
app.use(bodyParser.json());

app.get('/movements', function (req, res) {
  MongoHelper.getMovements(database, (err, docs) => {
    assert.equal(null, err);
    res.send(docs);
  });
})

app.get('/movementlogs/:date?', (req, res) => {
  MongoHelper.getMovementLogs(database, req.params, function(err, docs) {
    assert.equal(null, err);
    res.send(docs);
  });
})

app.put('/movementlogs/:date/:movement_id', function (req, res) {
  let weight = null;
  let reps = null;
  if (req.body != null) {
    if (req.body.weight != null) {
      weight = req.body.weight;
    }
    if (req.body.reps != null) {
      reps = req.body.reps;
    }
  }
  MongoHelper.addMovement(database, req.params.date, req.params.movement_id, weight, reps, (err, r) => {
    assert.equal(null, err);
    res.send(r);
  })
})

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  database = db;

  app.listen(8000, function () {
    console.log('lift-or-nah listening on port 8000!')
  })
});
