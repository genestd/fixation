var request = require('request')
module.exports = function(app, passport){

  app.get('/redirect.html', function(req,res){
    res.sendfile( __dirname + '/server/views/redirect.html')
  })
  app.route('/auth/twitter/token')
    .get(passport.authenticate('twitter-token'),
          function (req, res) {
            console.log(req.query)
            // do something with req.user
            res.send(req.user ? {success:true} : {success:false});
          });

  app.post('/auth/twitter/reverse', function(req, res) {
    var self = this;

    request.post({
      url: 'https://api.twitter.com/oauth/request_token',
      oauth: {
        consumer_key: process.env.CONSUMER_KEY,
        consumer_secret: process.env.CONSUMER_SECRET
      },
      form: { x_auth_mode: 'reverse_auth' }
    }, function (err, r, body) {
      if (err) {
        return res.status(500).send({ message: err.message });
      }

      if (body.indexOf('OAuth') !== 0) {
        return res.status(500).send({ message: 'Malformed response from Twitter' });
      }

      res.send({ x_reverse_auth_parameters: body });
    });
  });
/*  app.route('/auth/twitter')
  .get( passport.authenticate('twitter'))

  app.route('/auth/twitter/callback')
    .get( function(req,res,next){
      passport.authenticate('twitter', function(err, user, info){
        if (err) {
          console.log('/auth/twitter/callback err')
          return next(err);
        }
        if (!user) {
          console.log('/auth/twitter/callback user not found')
          return res.send({success: false, message: "not found"});
        }
        req.logIn(user, function(err) {
          if (err) { return next(err); }
          console.log('/auth/twitter/callback user logging in', user)
          return res.send({success: true, message: user});
        });
      })(req,res,next)
    })
*/
}
