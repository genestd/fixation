var mongoose = require('mongoose')
var bcrypt   = require('bcrypt-nodejs');
var Schema = mongoose.Schema

var FixationUser = new Schema({
  username: {type: String,
             unique: true},
  password: String,
  screen_name: {type: String,
                unique: true},
  image: String,
  twitter: {
    id: String,
    token: Object,
    username: String,
    screen_name: String,
    thumbnail: String
  },
  likedItems: []
})

FixationUser.methods.addLike = function(item, cb){
  for(var i=0; i<this.likedItems.length; i++){
    if( this.likedItems[i] === item){
      return( cb(null, false))
    }
  }
  this.likedItems.push(item)
  this.save(cb)
}

FixationUser.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
FixationUser.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('FixationUser', FixationUser)
