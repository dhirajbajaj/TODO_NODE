// external api calls model

var express = require('express');
var request = require('request');
var mongoose = require( 'mongoose' );
var User    = mongoose.model( 'User' );


var api_key = '4f7ab051-4a83-4a83-a16e-b024be654bab'

// url helper func
  pnr_status_url = function(pnr){
    return "http://api.erail.in/pnr?key=4f7ab051-4a83-4a83-a16e-b024be654bab&pnr=" + pnr
  };

  live_running_status_url = function(trainno,stnfrom,date){
    return "http://api.erail.in/live/?key=4f7ab051-4a83-4a83-a16e-b024be654bab&trainno=" + trainno + "&stnfrom=" + stnfrom + "&date=" + date
  };


// request helper



module.exports = {
    pnr_status: function(user, callback) {
      
      request(pnr_status_url(user.pnr), function (error, response, body) {
        if (!error && response.statusCode == 200) {
          // user.pnrstatus = body
          // user.save
          console.log(body); // Print the google web page.
          callback(error, response, body);
        }
      })
    }
    // get: function(id, callback) {
    //     User.findOne(id, function(err, user) {
    //        callback(err, user);
    //     });
    // },
    // create: function(data, callback) {
    //     var newUser = new User(data);
    //     newUser.save(function(err, savedUser) {
    //         // some logic here
    //         callback(err, savedUser); 
    //     });
    // },
    // delete: function(id, callback){
    //   User.findById(id, function (err, user) {
    //     user.remove( function ( err, user ){
    //       callback(err, user); 
    //     });
    //   });
    // }
};

