const responseHandler = require("../services/responseHandler")
const jwt = require('jsonwebtoken')
const { verifyToken } = require("../services/utils")

const authMiddleware = (req , res , next)=>{
    try{
        const token = req.cookies["x-acc-tkn"]
        console.log('access token',token)
        if(!token) return responseHandler.error(res , "Unauthorized access" , 401)
        const decoded = verifyToken(token);
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