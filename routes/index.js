var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var Todo     = mongoose.model( 'Todo' );

/* GET home page. */
router.get('/', function(req, res) {
  // show all todos relative to user  
  Todo.find().sort('-updated_at').find( function ( err, todos, count ){
    res.render( 'index', {
      title : ': ALL',
      todos : todos
    });
  });
});

// new todo form
router.get('/new', function(req, res) {
  res.render('new', { title: ': new' });
});

// edit todo form
router.get('/ed/:id', function(req, res) {
  Todo.findById(req.params.id, function (err, todo) {
    res.render('edit', {
      title: ': edit',
      todo : todo
    });
  });
});

// update todo form
router.post('/update', function(req, res) {
  console.dir(req.body);
  Todo.findById(req.body.id, function (err, todo) {
    todo.content = req.body.content;
    todo.save( function ( err, todo ){
      res.redirect( '/' );
    });
  });
});

// delete todo
router.get('/del/:id', function(req, res) {
  Todo.findById(req.params.id, function (err, todo) {
    todo.remove( function ( err, todo ){
      res.redirect( '/' );
    });
  });
});

//create new todo
router.post('/create', function(req, res) {
  // add TODO's to db
  new Todo({
    content    : req.body.content,
    updated_at : Date.now()
  }).save( function( err, todo, count ){
    res.redirect( '/' );
  });
});

module.exports = router;
