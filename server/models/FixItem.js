var mongoose = require('mongoose')
var Schema = mongoose.Schema

var FixItem = new Schema({
  title: String,
  text: String,
  user: String,
  thumbnail: String,
  img: String,
  likes: Number,
})

module.exports = mongoose.model('FixItem', FixItem)
