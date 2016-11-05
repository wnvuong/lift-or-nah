const MongoClient = require('mongodb').MongoClient;
const MongoHelper = require('./app/mongohelper.js');
const express = require('express');
const assert = require('assert');
const app = express();
const url = 'mongodb://localhost:27017/lift-or-nah';

let database = null;

app.use(express.static('build'))

app.get('/movements', function (req, res) {
  MongoHelper.getMovements(database, function(err, docs) {
    assert.equal(null, err);
    res.send(docs);
  });
})

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  database = db;

  app.listen(8000, function () {
    console.log('lift-or-nah listening on port 8000!')
  })
});
