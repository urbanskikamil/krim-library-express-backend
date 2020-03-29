const express = require('express')
const cors = require('cors')
const Access = require('../models/Access')
const Auth = require('../models/Auth')


var fs = require('fs');

const router = express.Router();

router.use(cors({
  credentials: true
}))

// Request for an access
router.post('/:accessType/:accessLevel', async (req, res) => {
  const newRequest = new Access({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    position: req.body.position,
    degree: req.body.degree,
    requestedAccess: req.params.accessType,
    accessLevel: req.params.accessLevel
  });
  console.log(newRequest)
  return newRequest.save()
})

// Get all requests
router.get('/', async (req, res) => {
  try {
    const allRequests = await Access.find()
    res.json(allRequests)
  }
  catch(err) {
    res.json({message: err})
  }
})

// Delete a request
router.post('/delete/:email', async (req, res) => {
  Access.deleteMany({ email: req.params.email })
    .then(deletedRequest => {
      console.log('deleted',deletedRequest)
    })
})

// Accept a request
router.post('/accept/:email/:accessType/:accessLevel', async (req, res) => {
  Auth.findOneAndUpdate({ email: req.params.email }, { accessLevel: req.params.accessLevel, access: req.params.accessType })
    .then(record => {
      console.log('updated record',record)
      
      Access.deleteMany({ email: req.params.email })
      .then(deletedRequest => {
        console.log('deleted',deletedRequest)
      })
    })
})

// Check if there is any request pending
router.get('/check/:email', async (req, res) => {
  Access.findOne({ email: req.params.email })
    .then(request => {
      if (request) {
        return res.send({ requestPending: true })
      }
      return res.send({ requestPending: false })
    })
})

module.exports = router