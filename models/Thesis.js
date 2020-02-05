const mongoose = require('mongoose')

const ThesisSchema = mongoose.Schema({
  id: String,
  type: String,
  title: String,
  field: String,
  author: String,
  supervisor: String,
  addedAt: String,
})

module.exports = mongoose.model('Thesis', ThesisSchema)