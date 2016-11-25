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

function getMovementLogs(db, date) {
  assert.notEqual(null, db);
  const movementLogscollection = db.collection('movement-logs'); 
  const movementsCollection = db.collection('movements');

  let retMovementLog = null;
  return movementLogscollection.findOne({ date: new Date(date) }).then(movementLog => {
    retMovementLog = movementLog;
    return Promise.all(movementLog.movements.map(movement => {
      return movementsCollection.findOne({ _id: new ObjectID(movement.id) });
    }), Promise.resolve());
  }).then(movements => {
    retMovementLog.movements = movements;
    return retMovementLog;
  });
}

function addMovement(db, date, movement_id) {
  const setPayload = {};
  setPayload['sets.' + movement_id + '.id'] = new ObjectID(movement_id);

  return db.collection('movement-logs').updateOne({ 
    date: new Date(date) 
  }, { 
    $addToSet: { 
      'movements': { 
        id: new ObjectID(movement_id) 
      } 
    },
    $set: setPayload
  });
}

function addSet(db, date, movement_id, weight, reps, index) {
  const set_id = new ObjectID();
  const pushPayload = {};
  pushPayload['sets.' + movement_id + '.values'] = {
    weight: weight,
    reps: reps,
    id: set_id,
  };
  
  const setPayload = {};
  setPayload['sets.' + movement_id + '.movement_id'] = new ObjectID(movement_id);

  const addToSetPayload = {};
  addToSetPayload.movements = { 
    id: new ObjectID(movement_id) 
  };

  return db.collection('movement-logs').updateOne({
    date: new Date(date)
  }, {
    $addToSet: addToSetPayload,
    $set: setPayload,
    $push: pushPayload
  }, {
    upsert: true
  }).then(result => {
    return getMovementLogs(db, date);   
  });
}

function removeSet(db, date, movement_id, set_id) {
  const query = {};
  query.date = new Date(date);
  
  const pullPayload = {};
  pullPayload['sets.' + movement_id + '.values'] = { id: new ObjectID(set_id) };

  return db.collection('movement-logs').findOneAndUpdate(query, {
    $pull: pullPayload
  }, {
    returnOriginal: false
  }).then(result => {
    assert.equal(1, result.ok);
    if (result.value.sets[movement_id].values.length == 0) {
      const unsetPayload = {};
      unsetPayload['sets.' + movement_id] = '';
      return db.collection('movement-logs').findOneAndUpdate(query, {
        $pull: { movements: { id: new ObjectID(movement_id) } },
        $unset: unsetPayload
      }).then(result => {
        assert.equal(1, result.ok);    
        return getMovementLogs(db, date);      
      });
    } else {
      return getMovementLogs(db, date);      
    }
  });

  // return db.collection('movement-logs').updateOne(query, { $pull: pullPayload }).then(result => {
  //   return getMovementLogs(db, date);
  // });
}

function updateSet(db, date, movement_id, set_id, weight, reps, callback) {
  const query = {};
  query.date = new Date(date);
  query['sets.' + movement_id + '.values.id'] = new ObjectID(set_id);

  const setPayload = {};
  setPayload['sets.' + movement_id + '.values.$.weight'] = weight;
  setPayload['sets.' + movement_id + '.values.$.reps'] = reps;

  db.collection('movement-logs').updateOne(query, {
    $set: setPayload
  }, (err, r) => {
    callback(err, r);
  });
}

module.exports = {
  getMovements: getMovements,
  getMovementLogs: getMovementLogs,
  addSet: addSet,
  removeSet: removeSet,
  updateSet: updateSet
}
