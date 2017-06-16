var request = require('request')
var oauthSignature = require('oauth-signature')
var jwt = require('jsonwebtoken')
var FixItem = require('../models/FixItem')
var FixationUser = require('../models/FixationUser')

module.exports = function(app, passport){

  //load fix items from database
  app.get('/initialize', function(req,res){
    FixItem.find({}, function(err, result){
      if(err){
        res.send({success: false, message: err})
        console.log(err)
      }
      res.send({success: true, items: result})
    })
  })

  //log out of passport, destroy session, return to index
  app.post('/logout', function(req,res){
    req.logout()
    req.session.destroy(function (err) {
        res.redirect('/ '); //Inside a callback… bulletproof!
    })
  })

  app.post('/addFixItem', isAuthenticated, function(req,res){

    var item = new FixItem(req.body)
    item.save( function(err, result){
      if(err){
        res.send({success: false, item: {}, message: err})
      } else {
        res.send({success: true, item: result})
      }
    })
  })

  app.post('/like', isAuthenticated, function(req,res){
    FixItem.findOne({_id: req.body.item}, function(err, result){
      if(err){
        res.send({success: false, message: err})
        console.log(err)
      }
      if(result.length===0){
        res.send({success: false, message: 'item not found'})
      } else {
        //save item to user likes
        FixationUser.findOne({screen_name: req.body.user}, function(err, user){
          if(err){ console.log(err)}
          user.addLike(req.body.item, function(err, done){
            if(err){ console.log(err) }
            //update item like count
            if(done){
              result.likes++
              result.save( function(err, done){
                if(err){
                  res.send({success: false, message: err})
                  console.log(err)
                } else {
                  res.send({success: true, message: done})
                }
              })
            } else {
              res.send({success: false, message: "can't like an item multiple times"})
            }
          })
        })

      }
    })
  })

  app.post('/mylikes', isAuthenticated, function(req,res){
    FixationUser.findOne({screen_name: req.body.user}, function(err, user){
      if(err){ return res.send({success: false, message: err})}
      console.log('finding items for ', user)
      var items = user.likedItems
      FixItem.find({ '_id': { $in: items}}, function(err, docs){
        console.log('docs', docs)
       res.send(docs);
      });
    })
  })

  app.post('/myadds', isAuthenticated, function(req,res){
    FixItem.find({ 'user': req.body.user}, function(err, docs){
      console.log('docs', docs)
      res.send(docs);
    });
  })

  app.post('/delete', isAuthenticated, function(req,res){
    FixItem.findByIdAndRemove(req.body.item, function(err, result){
      if(err){ return console.log(err)}
      FixItem.find({}, function(err, items){
        if(err){ return console.log(err)}
        res.send({items: items})
      })
    })
  })

  app.post('/auth', function(req,res){
    req.session.twitterToken = req.body.socialToken
    req.session.twitterTokenSecret = req.body.socialSecret
    //check if this token is authenticated on twitter.
    var headerOptions = buildTwitterAuthHeader(req)
    request(headerOptions, function(rq,rs){
      if( rs.statusCode === 200){
        var profile = JSON.parse(rs.body)
        var access_token = jwt.sign(profile, process.env.JWT_KEY,
                    { expiresIn: '1m',
                      issuer: 'FIXATION'
                    })
        req.session.access_token = access_token
        FixationUser.findOne({'twitter.id': profile.id}, function(err, user){
          if(err){ console.log(err); res.send({success: false})}
          if(user){
            console.log('found twitter user')
            res.send({success: true, user: {
              username: user.twitter.screen_name,
              screen_name: user.screen_name,
              image: user.twitter.thumbnail,
              likedItems: user.likedItems
            }})
          } else {
            console.log('adding twitter user')
            var newUser = new FixationUser()
              newUser.screen_name = profile.name
              newUser.twitter.id = profile.id
              newUser.twitter.username = profile.name
              newUser.twitter.screen_name = profile.screen_name
              newUser.twitter.thumbnail = profile.profile_image_url_https
              newUser.save(function(err, user){
                if(err){ console.log(err)}
                res.send({success: true, user: {
                  username: user.twitter.screen_name,
                  screen_name: user.screen_name,
                  image: user.twitter.thumbnail,
                  likedItems: []
                }})
              })
          }
        })
       }
    })
  })

  function verifyJwt(jwtString) {
      return jwt.verify(jwtString, process.env.JWT_KEY, {
          issuer: 'FIXATION'
      });
  }

  function isAuthenticated(req, res, next){
    //authenticated via passport local login
    if( req.session.user && req.session.user.authenticated ){
      return next()
    } else {
      //check for JWT created after social login
      var jwtString = req.session.access_token;
      try {
          var profile = verifyJwt(jwtString);
          return next();
      } catch (err) {
          //if verify failed, check whether server token expired while twitter token remains active
          try{
            console.log('renew attempt')
            var headerOptions = buildTwitterAuthHeader(req)
            request(headerOptions, function(rq,rs){
              if( rs.statusCode === 200){
                var access_token = jwt.sign(JSON.parse(rs.body), process.env.JWT_KEY,
                            { expiresIn: '24h',
                              issuer: 'FIXATION'
                            })
                profile = JSON.parse(rs.body)
                req.session.access_token = access_token
                console.log('token renewed!', profile)
                return next()
              } else {
                //couldn't renew?
                console.log('renew failed')
                res.send({success: false, message: 'user not authenticated'})
              }
            })
          } catch (error) {
            console.log('renew err!', err)
            res.redirect('/')
          }
      }
    }
  }

  function buildTwitterAuthHeader(req){
    //build the oauth signature
    var httpMethod = 'GET',
        url = 'https://api.twitter.com/1.1/account/verify_credentials.json',
        parameters = {
          oauth_consumer_key : process.env.CONSUMER_KEY,
          oauth_token : req.session.twitterToken,
          oauth_nonce : Math.round((new Date()).getTime() / 1000),
          oauth_timestamp : Math.round((new Date()).getTime() / 1000),
          oauth_signature_method : 'HMAC-SHA1',
          oauth_version : '1.0',
        },
        consumerSecret = process.env.CONSUMER_SECRET,
        tokenSecret = req.session.twitterTokenSecret,
        // generates a BASE64 encode HMAC-SHA1 hash
        signature = oauthSignature.generate(httpMethod, url, parameters, consumerSecret, tokenSecret,
        { encodeSignature: false});

      parameters.oauth_signature = signature

    //set Authorization header for twitter
      var header="OAuth "
      var counter=0
      for( key in parameters){
        if(counter>0){ header += ', '}
        header += encodeURIComponent(key) + '='
        header += '"'
        header += encodeURIComponent(parameters[key])
        header += '"'
        counter++
      }
      var options = {
        url: url,
        headers: {
          'Authorization': header
        }
      };

     return options
  }

}
