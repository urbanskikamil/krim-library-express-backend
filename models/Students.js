const mongoose = require('mongoose')

const StudentsSchema = mongoose.Schema({
  id: String,
  type: String,
  title: String,
  field: String,
  author: String,
  uploaderId: String,
  studiesClass: String,
  addedAt: String,
  file: String
})

module.exports = mongoose.model('Students', StudentsSchema, 'students')