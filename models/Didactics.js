const mongoose = require('mongoose')

const DidacticsSchema = mongoose.Schema({
  id: String,
  type: String,
  title: String,
  field: String,
  author: String,
  studiesClass: String,
  addedAt: String,
  file: String
})

module.exports = mongoose.model('Didactics', DidacticsSchema, 'didactics')