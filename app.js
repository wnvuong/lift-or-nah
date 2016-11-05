var express = require('express')
var app = express()

app.use(express.static('build'))

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log('lift-or-nah listening on port 3000!')
})
