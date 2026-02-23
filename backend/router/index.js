const express = require('express')
const router = express.Router()

router.use('/' ,(req , res)=>{
    res.redirect(process.env.CLIENT_URL)
})

router.use('/auth' , require('./auth'))
router.use('/blog' , require('./blog') )


module.exports = router