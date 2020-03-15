const mongoose = require('mongoose')

const PublicationsSchema = mongoose.Schema({
  id: String,
  type: String,
  title: String,
  field: String,
  author: String,
  supervisor: String,
  addedAt: String,
  file: String
})

module.exports = mongoose.model('Publications', PublicationsSchema, 'publications')