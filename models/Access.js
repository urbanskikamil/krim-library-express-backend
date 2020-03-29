const mongoose = require('mongoose')

const AccessSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  position: String,
  degree: String,
  requestedAccess: String,
  accessLevel: String
})

module.exports = mongoose.model('Access', AccessSchema, 'access')