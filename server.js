const express = require('express')
const port = 8080

const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv/config')
const session = require('express-session')

const fileUpload = require('express-fileupload');

app.use(fileUpload());

//Import routes
const thesisRoute = require('./routes/thesis')
const publicationsRoute = require('./routes/publications')
const studentsRoute = require('./routes/students')
const didacticsRoute = require('./routes/didactics')
const externalRoute = require('./routes/external')
const authRoute = require('./routes/auth')
const accessRoute = require('./routes/access')

app.use(bodyParser.json())
app.use('/documents/thesis', thesisRoute)
app.use('/documents/publications', publicationsRoute)
app.use('/documents/students', studentsRoute)
app.use('/documents/didactics', didacticsRoute)
app.use('/documents/external', externalRoute)
app.use('/login', authRoute)
app.use('/requestAccess', accessRoute)

app.use(cors())
app.use('/', () => console.log('Middleware running'))

//connect to db
mongoose.connect(process.env.DB_CONNECTION,
{ useNewUrlParser: true, useUnifiedTopology: true },
() => console.log('Connected to remote MongoDB'))

app.listen(port, () => console.log(`KRIM Library express backend listening on port ${port}!`))