const assert = require('assert');

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

function getMovements(db, callback) {
  findDocuments(db, 'movements', callback);
}

module.exports = {
  getMovements: getMovements
}
