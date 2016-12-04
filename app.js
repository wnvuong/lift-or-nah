const MongoClient = require('mongodb').MongoClient;
const MongoHelper = require('./src/utils/mongohelper.js');
const express = require('express');
const bodyParser = require('body-parser');
const assert = require('assert');
const app = express();
const router = express.Router();

let mongoURL = 'mongodb://localhost:27017/lift-or-nah';
if (process.env.NODE_ENV === 'production') {
  mongoURL = 'mongodb://' + process.env.MONGO_USER + ':' + process.env.MONGO_PASSWORD + '@' + process.env.MONGO_URL; 
}

let database = null;

router.use(express.static('build'));
router.use(bodyParser.json());

router.get('/movements', function (req, res) {
  MongoHelper.getMovements(database, (err, docs) => {
    assert.equal(null, err);
    res.send(docs);
  });
})

router.get('/movementlogs/:date?', (req, res) => {
  MongoHelper.getMovementLogs(database, req.params.date).then(movementLog => {
    res.send([movementLog]);
  });
})

router.put('/movementlogs/:date/:movement_id', (req, res) => {
  let weight = null;
  let reps = null;
  let index = null;
  if (req.body != null) {
    if (req.body.weight != null) {
      weight = req.body.weight;
    }
    if (req.body.reps != null) {
      reps = req.body.reps;
    }
    if (req.body.index != null) {
      index = req.body.index;
    }
  }
  MongoHelper.addSet(database, req.params.date, req.params.movement_id, weight, reps, index).then(movementLog => {
    res.send([movementLog]);
  });
})

router.delete('/movementlogs/:date/:movement_id/:set_id', (req, res) => {
  MongoHelper.removeSet(database, req.params.date, req.params.movement_id, req.params.set_id).then(movementLog => {
    res.send([movementLog]);
  })
});

router.put('/movementlogs/:date/:movement_id/:set_id', (req, res) => {
  MongoHelper.updateSet(database, req.params.date, req.params.movement_id, req.params.set_id, req.body.weight, req.body.reps, (err, r) => {
    assert.equal(null, err);
    res.send(r);
  });
});


if (process.env.NODE_ENV === 'production') { 
  app.use('/lift-ledger', router);
} else {
  app.use('/', router);
}

MongoClient.connect(mongoURL, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  database = db;
  let port = 8000;
  
  app.listen(port, function () {
    console.log('lift-or-nah listening on port ' + port + '!')
  })
});
