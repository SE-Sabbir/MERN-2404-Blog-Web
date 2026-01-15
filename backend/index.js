const express = require('express')
const cors = require('cors')
const dbConfig = require('./db')
const router = require('./router')
const app = express()
require('dotenv').config()
app.use(express.json())
app.use(cors())
app.use(router)

dbConfig()

app.listen(8000, () => {
  console.log('Server is running')
})

