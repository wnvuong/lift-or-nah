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

function findDocumentByQuery(db, collectionName, query) {
  assert.notEqual(null, db);
  assert.notEqual(null, query);

  var collection = db.collection(collectionName);
  return collection.findOne(query);
}

function getMovements(db, callback) {
  findDocuments(db, 'movements', callback);
}

function getMovementLogs(db, params, callback) {
  assert.notEqual(null, db);
  const movementLogscollection = db.collection('movement-logs'); 
  const movementsCollection = db.collection('movements');
  let retMovementLog = null;
  movementLogscollection.findOne({ workoutDate: new Date(params.date) }).then((movementLog) => {
    retMovementLog = movementLog;
    return Promise.all(movementLog.movements.map((elem, index) => {
      return movementsCollection.findOne({ _id: elem.movement_id }); 
    }));
  }).then((movements) => {
    retMovementLog.movements.forEach((elem, index) => {
      elem.movement = movements[index];
      delete elem.movement_id;
    });
    callback(null, [retMovementLog])
  });
}

function addMovement(db, data, callback) {
  // TODO: upsert if it doesnt exist
  db.collection('movement-logs').updateOne({
    workoutDate: new Date(data.workoutDate),
    'movements.movement_id': {$ne: new ObjectID(data.movementId)}
  }, {
    $push: {
      movements: {
        movement_id: new ObjectID(data.movementId),
        sets: []
      }
    }
  }, (err, r) => {
    callback(null, r);
  });
}

module.exports = {
  getMovements: getMovements,
  getMovementLogs: getMovementLogs,
  addMovement: addMovement
}
