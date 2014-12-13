var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var Todo     = mongoose.model( 'Todo' );
var User =  require('../models/user');

/* GET home page. */
router.get('/', function(req, res) {
  // show all todos relative to user  
  User.all(function( err, users, count ){
    res.render( 'index', {
      title : ': ALL',
      users : users,
      count : count,
      msg : req.query.msg
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
  User.delete(req.params.id, function (err, todo) {
    if (err) {
      res.redirect( '/?msg=Error occurred' );
    }else{
      res.redirect( '/?msg=Deleted sucessfully' );
      // res.send('user.saved ' + user.pnr);
    }
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

//create new todo
router.post('/pnrcreate', function(req, res) {
  // add TODO's to db
  User.create( { pnr : req.body.pnr, mobile : req.body.mobile, updated_at : Date.now() },  function( err, user ){
    if (err) {
      res.redirect( '/?msg=Request error --> ' + err );
    }else{
      res.redirect( '/?msg=Pnr request accepted' );
      // res.send('user.saved ' + user.pnr);
    }
  });
});

module.exports = router;
