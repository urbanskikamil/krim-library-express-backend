const express = require('express')
const cors = require('cors')
const path = require('path')
const Thesis = require('../models/Thesis')
var fs = require('fs');

const router = express.Router();
const uri_thesis_files = path.join(__dirname, '../public/images/thesis/')

router.use(cors())

//Get the list of all records from DB

router.get('/', async (req, res) => {
  try {
    const documents = await Thesis.find()
    res.json(documents)
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
  console.log('Request that is adding a record', req.body)
  
  const document = new Thesis({
    id: req.body.id,
    type: req.body.type,
    title: req.body.title,
    field: req.body.field,
    author: req.body.author,
    studentId: req.body.studentId,
    uploaderId: req.body.uploaderId,
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


let fileName = ''

//Get id of a record
router.get('/:recordId', async (req, res) => {
    const record = await Thesis.find({id: req.params.recordId})
    fileName = record[0].file
    res.json(record)
} )

//Delete record 
router.delete('/:recordId', async (req, res) => { 
  try {  
    const deletedRecord = await Thesis.deleteOne({id: req.params.recordId})
    res.json(deletedRecord)
    fs.unlinkSync(`${uri_thesis_files}${fileName}`)
  }
  catch(err) {
    res.json({message: err})
  }
})

//Upload a file
router.put('/upload', async (req, res) => {
   if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  let file = req.files.file;

  let fileName = `${req.body.type.replace(/ /g,"_")}_${req.body.studentId}.${req.files.file.name.split('.').pop()}`; 

  await file.mv(uri_thesis_files + fileName, 
    (err) => {
      if (err)
        return res.status(500).send(err);
    });
  res.send({fileUploaded: true})
  return
})

module.exports = router