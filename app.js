var express = require('express');


//parserek
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

//db
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/node-todo-app');

//app deklaralas
var app = express();

// define model =================
var Todo = mongoose.model('Todo', {
    text : String
});


//view
app.set('view engine', 'pug');
app.set('views', './views');

//parse
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(upload.array());
//static fileok a public mappaban
app.use(express.static('public'));

//fooldal
app.get('/', function (req, res) {
	console.log('request homera');
	Todo.find(function(err, todos) {
		var texts = [];
		for (var i = 0; i < todos.length; ++i) {
			texts.push(todos[i].text);
		}
		console.log(texts);
		res.render('home', {todos: texts});
	});

});

app.listen(3000, function () {
	console.log('The server is set up, and listening on port 3000.');
});
