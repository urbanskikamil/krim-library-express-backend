const mongoose = require('mongoose')

const AuthSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
})

module.exports = mongoose.model('Auth', AuthSchema, 'auth')