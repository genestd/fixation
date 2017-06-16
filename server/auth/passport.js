//passport
var FixationUser = require('../models/FixationUser')
var LocalStrategy = require('passport-local').Strategy

module.exports = function(passport){
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    FixationUser.findById(user._id, function(err, user) {
      done(err, user);
    });
  }); 
}
