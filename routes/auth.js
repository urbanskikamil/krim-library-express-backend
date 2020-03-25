const express = require('express')
const cors = require('cors')
const Auth = require('../models/Auth')
var fs = require('fs');

const router = express.Router();

router.use(cors())

// Sign-in
router.post('/sign-in', async (req, res) => {
  Auth.findOne({ email: req.body.email })
    .then((response) => {
      if (response) {
        if (req.body.password === response.password) {
          return res.send({emailAuthenticated: true, validPassword: true})
        }
        else {
          return res.send({emailAuthenticated: true, validPassword: false})
        }
      }
      else {
        return res.send({emailAuthenticated: false, validPassword: false})
      }
    })
    .catch(err => console.log(err))
})

// Sign-up
router.post('/sign-up', async (req, res) => {
  const account = Auth.findOne({ email: req.body.email })
    .then(sameEmail => {
      if (sameEmail) {
        return res.send({ emailExist: true })
      }
      const newUser = new Auth({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
      });
      res.send({ emailExist: false })
      return newUser.save()
    })
    .catch(err => console.log(err))
})

module.exports = router