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

router.get('/:recordId', async (req, res) => {
  try {
    const record = await Thesis.findById(req.params.recordId)
    res.json(record)
  }
  catch(err) {
    res.json({message: err})
  }
} )

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

//Uploading a file

router.post('/upload', (req, res) => {
   console.log(req.files.sampleFile)
   if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;
  let fileName = req.files.sampleFile.name;  
  
  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv('/Users/kamil/Desktop/STUDIA/MAGISTER/Praca magisterska/krim-library-express-backend/public/images/' + fileName, 
  (err) => {
    if (err)
      return res.status(500).send(err);
  });
})

// router.get('/:recordId', async (req, res) => {
//   try {
//     const record = await Thesis.findByIdAndDelete(req.params.recordId)
//     res.json(record)
//   }
//   catch(err) {
//     res.json({message: err})
//   }
// } )

module.exports = router