const express = require('express')
const port = 8080

const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv/config')

//Import routes
const thesisRoute = require('./routes/thesis')

app.use(bodyParser.json())
app.use('/', thesisRoute)

app.use(cors())
app.use('/', () => console.log('Middleware running'))
// app.use(express.json())

//connect to db
mongoose.connect(process.env.DB_CONNECTION,
{ useNewUrlParser: true, useUnifiedTopology: true },
() => console.log('connected to db'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))