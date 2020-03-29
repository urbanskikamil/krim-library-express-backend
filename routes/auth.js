const express = require('express')
const cors = require('cors')
const Auth = require('../models/Auth')
const bcrypt = require('bcryptjs')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
var ObjectId = require('mongodb').ObjectID;


var fs = require('fs');

const MONGODB_URI = 'mongodb+srv://krim-library:Thesis666@cluster0-nffek.mongodb.net/test?retryWrites=true&w=majority'

const router = express.Router();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions',
  //expires:
})

router.use(
  session({
      secret: 'my secret', 
      resave: false, 
      saveUninitialized: false,
      store: store, 
      // cookie: {isAuthorized: true},
      // unset: 'destroy'
  })
)
router.use(cors({
  credentials: true
}))

// Sign-in
router.post('/sign-in', async (req, res) => {
  Auth.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        bcrypt.compare(req.body.password, user.password)
          .then(result => {
            if (result) {
              req.session.isAuthorized = true
              req.session.userEmail = user.email
              console.log('req session' ,req.session)
              return res.send({session: req.session ,user: user,emailAuthenticated: true, validPassword: true})
            }
            return res.send({emailAuthenticated: true, validPassword: false})
          })
          .catch(err => {
            console.log(err)
            res.redirect('/login')
          })
      }
      else {
        return res.send({emailAuthenticated: false, validPassword: false})
      }
    })
    .catch(err => console.log(err))

})


// Get data connected with email
router.get('/getData/:email', async (req, res) => {
  Auth.findOne({ email: req.params.email })
    .then(user => {
      res.send(user)
    })
})

// Logout
router.post('/logout', (req, res) => {
  console.log('id', req.body._id)
  //const test = Session.find().then(result => console.log(result))
  // Session.findOne({ session: { user: { email: 'kamilurb@gmail.com' }} })
  // .then(result => console.log(result))
  // Session.deleteOne({ session: { user: { email: req.body.email }}})
  //   .then(session => {
  //     console.log(session)
  //   })
  // console.log('body', req.body)
  req.session.destroy()
  res.redirect('/')
})

// Sign-up
router.post('/sign-up', async (req, res) => {
  Auth.findOne({ email: req.body.email })
    .then(sameEmail => {
      if (sameEmail) {
        return res.send({ emailExist: true })
      }
      return bcrypt
        .hash(req.body.password, 12)    
        .then(hashedPassword => {
          const newUser = new Auth({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword,
            position: req.body.position,
            degree: req.body.degree,
            access: req.body.access,
            accessLevel: req.body.accessLevel
          });
          res.send({ emailExist: false })
          return newUser.save()
        })
    })
    .catch(err => console.log(err))
})

module.exports = router