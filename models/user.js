var express = require('express');
var mongoose = require( 'mongoose' );
var User    = mongoose.model( 'User' );


module.exports = {
    all: function(callback) {
      User.find().sort('-updated_at').find( function ( err, users, count ){
        callback(err, users, count);
      });
    },
    get: function(id, callback) {
        User.findOne(id, function(err, user) {
           callback(err, user);
        });
    },
    create: function(data, callback) {
        var newUser = new User(data);
        newUser.save(function(err, savedUser) {
            // some logic here
            callback(err, savedUser); 
        });
    },
    delete: function(id, callback){
      User.findById(id, function (err, user) {
        user.remove( function ( err, user ){
          callback(err, user); 
        });
      });
    }
};

