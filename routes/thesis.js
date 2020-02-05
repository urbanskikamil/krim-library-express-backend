const express = require('express')
const cors = require('cors')
const Thesis = require('../models/Thesis')

const router = express.Router();

router.use(cors())

router.get('/thesis', async (req, res) => {
  try {
    const documents = await Thesis.find()
    res.json(documents)
  }
  catch(err) {
    res.json({message: err})
  }
})

router.post('/thesis', async (req, res) => {
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
    const savedDocument = document.save()
    res.json(savedDocument)
  }
  catch(err) {
    res.json({message: err})
  }

})

module.exports = router