const assert = require('assert');
const ObjectID = require('mongodb').ObjectID;

function findDocuments(db, collectionName, callback) {
  assert.notEqual(null, db);

  var collection = db.collection(collectionName);
  collection.find().toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs)
    callback(null, docs);
  });
}

function findDocumentsByQuery(db, collectionName, query, callback) {
  assert.notEqual(null, db);
  assert.notEqual(null, query);

  var collection = db.collection(collectionName);
  collection.find(query).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs)
    callback(null, docs);
  });
}

function getMovements(db, callback) {
  findDocuments(db, 'movements', callback);
}

function getMovementLogs(db, params, callback) {
  findDocumentsByQuery(db, 'movement-logs', { workoutDate: new Date(params.date) }, function(err, movementLogs) {
    assert.equal(null, err);

    movementLogs.forEach(function (log, index) {
      log.movements.forEach(function (movement, index, arr) {
        findDocumentsByQuery(db, 'movements', { _id: movement.movement_id }, function (err, docs) {
          arr[index].movement = docs[0];
          arr[index].movement_id = undefined;

          if (index === arr.length - 1) {
            callback(null, movementLogs);
          }
        })
      })
    })
  });
}

function addMovement(db, data, callback) {
  db.collection('movement-logs').updateOne({
    workoutDate: new Date(data.workoutDate)
  }, {
    $push: {
      movements: {
        movement_id: new ObjectID(data.movementId),
        sets: []
      }
    }
  }, {
    upsert: true
  }, (err, r) => {
    callback(null, r);
  });
}

module.exports = {
  getMovements: getMovements,
  getMovementLogs: getMovementLogs,
  addMovement: addMovement
}
