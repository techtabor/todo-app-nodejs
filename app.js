var express = require('express')
var app = express()

app.get('/', function (req, res) {
  console.log("Request erkezett.");
  res.send('Hello World');
})

app.listen(3000, function() {
	console.log('Fut a "szerver" a 3000 porton.')
});
