const mongoose = require('mongoose')

const DidacticsSchema = mongoose.Schema({
  id: String,
  type: String,
  title: String,
  field: String,
  author: String,
  supervisor: String,
  addedAt: String,
  file: String
})

module.exports = mongoose.model('Didactics', DidacticsSchema, 'didactics')