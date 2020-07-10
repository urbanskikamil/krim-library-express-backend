const mongoose = require('mongoose')

const ThesisSchema = mongoose.Schema({
  id: String,
  type: String,
  title: String,
  field: String,
  author: String,
  studentId: String,
  uploaderId: String,
  supervisor: String,
  addedAt: String,
  file: String
})

module.exports = mongoose.model('Thesis', ThesisSchema, 'theses')