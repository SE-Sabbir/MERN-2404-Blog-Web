const express = require('express')
const cors = require('cors')
const dbConfig = require('./db')
const router = require('./router')
const cookieParser = require('cookie-parser')
const app = express()
require('dotenv').config()
app.use(express.json())
app.use(cookieParser())
console.log(process.env.CLIENT_URL)
app.use(cors(
  {
    origin:"https://devblog-murex-three.vercel.app",
    credentials: true
  }
))

app.use(router)
dbConfig()

app.listen(8000, () => {
  console.log('Server is running')
})

