const express = require('express')
require('dotenv').config()
const cors = require('cors')
const dbConfig = require('./db')
const router = require('./router')
const cookieParser = require('cookie-parser')
const app = express()
app.use(express.json())
app.use(cookieParser())
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000", // if using preview
  "https://devblog-murex-three.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(router)
dbConfig()

app.listen(8000, () => {
  console.log('Server is running')
})

