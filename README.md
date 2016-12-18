# todo-app-nodejs
steps to create a simple todo app with node.js

### node setup

* create a new folder on your machine
* Download and install node.js from [here](https://nodejs.org/en/download/).
* `node` opens the node shell in terminal, test it
* inside the folder, `npm init` from terminal for creation of package.json file

### hello world app

* create a `hello.js` file with the following:
``` javascript
console.log("hello");
```

* try it out with `node hello.js`

### hello world server

* install express: `npm install express --save`
* the `--save` option saves this as needed dependency to the package.json file
* create an `app.js` file with the following:

``` javascript
var express = require('express')
var app = express()

app.get('/', function (req, res) {
  console.log("Request arrived.");
  res.send('Hello World');
})

app.listen(3000, function() {
	console.log('The server is set up, and listening on port 3000.')
});
```

* type `node app.js` in the terminal, then open `http://localhost:3000` in your browser.
* You should see "Request arrived" every time you refresh the page in your browser.

### install further packages and MongoDB setup

* `npm install mongoose --save`
* `mkdir db`
* add db to your `.gitignore` file
* windows: `"c:\Program Files\MongoDB\Server\3.2\bin\mongod.exe" --dbpath db`
* mac osx: start mongodb process with `mongod --dbpath=./db`
* `npm install body-parser --save`
* `npm install multer --save`
* `npm install pug --save`

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
	console.log('request for home');
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
```
* `mkdir views`
* add the following to your `views/home.pug` file:
``` Jade
html
	head
		title My Todo list

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

		a(href="/add_todo") I add a Todo
```

* in another terminal, `node app.js`, then open `localhost:3000` in your browser.

### add todo
* add the following to your `app.js` file:

``` javascript
//todo hozzaadas
app.get('/add_todo', function(req, res) {
	console.log('request for add_todo');
	res.render('add_todo');
});

app.post('/add', function(req, res) {
	res.render('add');
	console.log('add todo: ' + req.body.todo_text);
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
                input.form-control(name="todo_text" placeholder="write your Todo here")
                button.btn-primary(type="submit") Save
```

* add the following to your `views/add.pug` file:
``` Jade
html
	head
		title My first todo app
	body
		h3 Saving was successful
		a(href="/") Back to all the Todos
```

* run `node app.js` again, and add several todos.
Meanwhile see in your console what happens after every click.

### Final thoughts
Ha végeztél a fentiekkel, érdemes átolvasni, és végigcsinálni [ezt](https://scotch.io/tutorials/creating-a-single-page-todo-app-with-node-and-angular) a tutorialt is.
