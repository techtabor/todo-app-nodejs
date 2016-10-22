# todo-app-nodejs
steps to create a simple todo app with node.js

### node setup

* Download and install node.js from [here](https://nodejs.org/en/download/).
* `node` opens the node shell in terminal
* install express: `npm install express`

### hello world app

* create a `hello.js` file with the following: 
``` javascript
Console.log("hello");
```

* try it out with `node hello.js`

### hello world server

* create an `app.js` file with the following:
``` javascript
var express = require('express')
var app = express()

app.get('/', function (req, res) {
  console.log("Request erkezett.");
  res.send('Hello World');
})

app.listen(3000, function() {
	console.log('Fut a "szerver" a 3000 porton.')
});
```

* type `node app.js` in the terminal, then open `http://localhost:3000` in your browser. 

### install further packages and MongoDB setup

* `npm install mongoose`
* `mkdir db`
* `"c:\Program Files\MongoDB\Server\3.2\bin\mongod.exe" --dbpath db`
* `npm install body-parser`
* `npm install multer`
* `npm install pug`


