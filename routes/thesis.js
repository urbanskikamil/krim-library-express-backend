const express = require('express')
const cors = require('cors')
const Thesis = require('../models/Thesis')
var fs = require('fs');

const router = express.Router();

const uri_thesis_files = '/Users/kamil/Desktop/STUDIA/MAGISTER/Praca magisterska/krim-library-express-backend/public/images/thesis/'

router.use(cors())

//Get the list of all records from DB

router.get('/', async (req, res) => {
  try {
    const documents = await Thesis.find()
    res.json(documents)
    console.log(documents)
  }
  catch(err) {
    res.json({message: err})
  }
})

//Download a specific document by clicking on download icon

router.get('/download/:fileName', (req, res) => {
  try {
    res.download(uri_thesis_files + req.params.fileName, req.params.fileName)
    console.log('Your file has been downloaded!')
  }
  catch(err) {
    console.log('Your file has not been downloaded!')
  }
});

//Add a record to DB

router.post('/', async (req, res) => {
  console.log(req.body)
  
  const document = new Thesis({
    id: req.body.id,
    type: req.body.type,
    title: req.body.title,
    field: req.body.field,
    author: req.body.author,
    supervisor: req.body.supervisor,
    addedAt: req.body.addedAt,
    file: req.body.file
  })
  try {
    const savedDocument = await document.save()
    res.json(savedDocument)
  }
  catch(err) {
    res.json({message: err})
  }

})

//Get one record by id 

router.get('/:recordId', async (req, res) => {
  try {
    const record = await Thesis.findById(req.params.recordId)
    res.json(record)
  }
  catch(err) {
    res.json({message: err})
  }
} )

//Delete record 

router.delete('/:recordId', async (req, res) => { 
  try {  
    // const record = Thesis.findById(req.params.recordId)
    // console.log(record)
    const deletedRecord = await Thesis.deleteOne({id: req.params.recordId})
    res.json(deletedRecord)
    console.log(deletedRecord)
  }
  catch(err) {
    res.json({message: err})
  }
})

//Upload a file

router.put('/upload', (req, res) => {
   console.log(req.files.file)
   if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  console.log(req)
  //res.send(req.files.sampleFile)
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let file = req.files.file;
  let fileName = req.files.file.name;  
  
  // Use the mv() method to place the file somewhere on your server
  file.mv(uri_thesis_files + fileName, 
  (err) => {
    if (err)
      return res.status(500).send(err);
  });
})

module.exports = router