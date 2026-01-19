const responseHandler = require("../services/responseHandler")
const jwt = require('jsonwebtoken')

const authMiddleware = (req , res , next)=>{
    try{
        const token = req.cookies["x-acc-tkn"]
        console.log('access token',token)
        if(!token) return responseHandler.error(res , "Unauthorized access" , 401)
        const decoded = jwt.verify(token , process.env.JWT_SECRET)
        if(!decoded) return responseHandler.error(res , "Unauthorized access" , 401)
        req.user = decoded
        next()
    }
    catch(err){
        responseHandler.error(res , "Internal Server Error")
        console.log(err)
    }
}

module.exports = {authMiddleware}