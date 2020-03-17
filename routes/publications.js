const express = require('express')
const cors = require('cors')
const Publications = require('../models/Publications')
var fs = require('fs');

const router = express.Router();

const uri_publications_files = '/Users/kamil/Desktop/STUDIA/MAGISTER/Praca magisterska/krim-library-express-backend/public/images/publications/'

router.use(cors())

//Get the list of all records from DB

router.get('/', async (req, res) => {
  try {
    const documents = await Publications.find()
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
    res.download(uri_publications_files + req.params.fileName, req.params.fileName)
    console.log('Your file has been downloaded!')
  }
  catch(err) {
    console.log('Your file has not been downloaded!')
  }
});

//Add a record to DB

router.post('/', async (req, res) => {
  console.log(req.body)
  
  const document = new Publications({
    id: req.body.id,
    type: req.body.type,
    title: req.body.title,
    field: req.body.field,
    author: req.body.author,
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


let fileName = ''

//Get id of a record
router.get('/:recordId', async (req, res) => {
    console.log(req.params.recordId)
    const record = await Publications.find({id: req.params.recordId})
    fileName = record[0].file
    res.json(record)
} )

//Delete record 
router.delete('/:recordId', async (req, res) => { 
  try {  
    const deletedRecord = await Publications.deleteOne({id: req.params.recordId})
    res.json(deletedRecord)
    fs.unlinkSync(`${uri_publications_files}${fileName}`)
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
  let file = req.files.file;
  let fileName = req.files.file.name;  
  
  file.mv(uri_publications_files + fileName, 
    (err) => {
      if (err)
        return res.status(500).send(err);
    });
})

module.exports = router