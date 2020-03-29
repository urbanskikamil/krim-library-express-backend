const mongoose = require('mongoose')

const AuthSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  position: String,
  degree: String,
  access: String,
  accessLevel: Number
})

module.exports = mongoose.model('Auth', AuthSchema, 'auth')