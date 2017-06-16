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

  passport.use( 'local-login', new LocalStrategy({
    usernameField : 'username',
    passwordField : 'password',
    passReqToCallback : true // pass back the entire request to the callback
  },
  function(req, username, password, done) {
    console.log('in local signup')
    // asynchronous
    // User.findOne wont fire unless data is sent back
    process.nextTick(function() {

    // find a user whose email is the same as the forms email
    // we are checking to see if the user trying to login already exists
    console.log(username, password, req.body)
    FixationUser.findOne({ 'username' :  username }, function(err, user) {
      // if there are any errors, return the error
      if (err)
          return done(err);

      // check to see if theres already a user with that email
      if (user) {
        if( !user.validPassword(password)){
          return done(null, false, {success: false, code:2, msg: 'Invalid password!'})
        } else {
          return done(null, user)
        }
      } else {
          if(req.body.screen_name){

            // if there is no user with that email
            // create the user
            var newUser = new FixationUser();

            // set the user's local credentials
            newUser.username = username;
            newUser.password = newUser.generateHash(password);
            newUser.screen_name = req.body.screen_name;
            newUser.avatar = ''
            // save the user
            newUser.save(function(err,user) {
                if (err)
                    throw err;
                return done(null, {
                  username: user.username,
                  screen_name: user.screen_name,
                  image: user.avatar,
                  likedItems: []
                });
            });
            return done(null, newUser)
          } else {
            return done(null, false, {success: false, code:1, msg: 'No user with that username'})
          }
        }
      });
    });
  })
 )
}
