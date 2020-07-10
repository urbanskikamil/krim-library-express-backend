const mongoose = require('mongoose')

const ExternalSchema = mongoose.Schema({
  id: String,
  type: String,
  title: String,
  field: String,
  author: String,
  uploaderId: String,
  addedAt: String,
  file: String
})

module.exports = mongoose.model('External', ExternalSchema, 'external')