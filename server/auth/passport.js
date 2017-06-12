//passport
var FixationUser = require('../models/FixationUser')
var LocalStrategy = require('passport-local').Strategy
var TwitterStrategy = require('passport-twitter').Strategy
var TwitterTokenStrategy = require('passport-twitter-token')

module.exports = function(passport){
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    FixationUser.findById(user._id, function(err, user) {
      done(err, user);
    });
  });

  passport.use(new TwitterTokenStrategy({
        consumerKey     : process.env.CONSUMER_KEY,
        consumerSecret  : process.env.CONSUMER_SECRET,
    },
    function(token, tokenSecret, profile, done) {
      console.log('here!')
      process.nextTick( function(){

        FixationUser.findOne({'twitter.id': profile.id}, function(err,user){
          if(err){ return done(err)}

          if(user){
            return done(null, user)
          } else {
            var newUser = new FixationUser()
            newUser.twitter.id  = profile.id;
            newUser.twitter.token = token;
            newUser.twitter.username = profile.username;
            newUser.twitter.screen_name = profile.displayName;


            // save our user into the database
            newUser.save(function(err) {
              if (err){ throw err };

              return done(null, newUser);
            });
          }
        })
      })
    })
  )
}
