var mongoose = require('mongoose')
var bcrypt   = require('bcrypt-nodejs');
var Schema = mongoose.Schema

var FixationUser = new Schema({
  username: {type: String,
             unique: true},
  password: String,
  twitter: {
    id: String,
    token: Object,
    username: String,
    screen_name: String
  }
})

module.exports = mongoose.model('FixationUser', FixationUser)
