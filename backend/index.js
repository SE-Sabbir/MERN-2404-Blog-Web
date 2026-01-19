const express = require('express')
const cors = require('cors')
const dbConfig = require('./db')
const router = require('./router')
const cookieParser = require('cookie-parser')
const app = express()
require('dotenv').config()
app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use(router)
dbConfig()

app.listen(8000, () => {
  console.log('Server is running')
})

