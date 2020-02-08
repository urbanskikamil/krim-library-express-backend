const express = require('express')
const cors = require('cors')
const Thesis = require('../models/Thesis')

const router = express.Router();

router.use(cors())

router.get('/', async (req, res) => {
  try {
    const documents = await Thesis.find()
    res.json(documents)
  }
  catch(err) {
    res.json({message: err})
  }
})

router.post('/', async (req, res) => {
  console.log(req.body)
  
  const document = new Thesis({
    id: req.body.id,
    type: req.body.type,
    title: req.body.title,
    field: req.body.field,
    author: req.body.author,
    supervisor: req.body.supervisor,
    addedAt: req.body.addedAt
  })
  try {
    const savedDocument = await document.save()
    res.json(savedDocument)
  }
  catch(err) {
    res.json({message: err})
  }

})

//Getting one record by id 

// router.get('/:recordId', async (req, res) => {
//   try {
//     const record = await Thesis.findById(req.params.recordId)
//     res.json(record)
//   }
//   catch(err) {
//     res.json({message: err})
//   }
// } )

//Deleting record 

router.delete('/:recordId', async (req, res) => {
  try {
    const deletedRecord = await Thesis.deleteOne({id: req.params.recordId})
    res.json(deletedRecord)
  }
  catch(err) {
    res.json({message: err})
  }
})

router.get('/:recordId', async (req, res) => {
  try {
    const record = await Thesis.findByIdAndDelete(req.params.recordId)
    res.json(record)
  }
  catch(err) {
    res.json({message: err})
  }
} )

module.exports = router