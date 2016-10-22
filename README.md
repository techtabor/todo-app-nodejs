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

### todo list server

* add the following to your `app.js` file:
``` javascript
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
	console.log('Elindult a szerver');
});
```

* add the following to your `views/home.pug` file:
``` Jade
html
	head
		title A TODO listam
		
		script(src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js")
		link(rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous")
		link(rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous")
		script(src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous")

	body
		table.table.table-striped
			thead
				tr
					th TODO
			
			tbody
				each todo in todos
					tr
						td= todo

		a(href="/add_todo") Hozzaadok egy TODOT
```

### add todo
* add the following to your `app.js` file:
``` javascript
//todo hozzaadas
app.get('/add_todo', function(req, res) {
	console.log('request add_todo-ra');
	res.render('add_todo');
});

app.post('/add', function(req, res) {
	res.render('add');
	console.log('todo hozzadas: ' + req.body.todo_text);
	Todo.create({text: req.body.todo_text})
});
```

* add the following to your `views/add_todo.pug` file:
``` Jade
html
    head
        title Add TODO
        script(src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js")
        link(rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous")
        link(rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous")
        script(src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous")

    body
        form.form-inline(action="/add", method="POST")
            div.form-group
                label(for="todo_text") TODO: 
                input.form-control(name="todo_text" placeholder="ird ide a TODO-t")
                button.btn-primary(type="submit") Mentem
```

* add the following to your `views/add.pug` file:
``` Jade
html
	head
		title YEEEEEY
	body
		h3 Sikeres volt a mentes
		a(href="/") Vissza az osszes TODO-hoz
```
