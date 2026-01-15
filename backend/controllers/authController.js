const userSchema = require("../models/userSchema")
const responseHandler = require("../services/responseHandler")
const { generateOTP } = require("../services/utils")

const register = async (req , res)=>{
    try{
        const {fullName , email , password} = req.body
        const OTP = generateOTP()
        const user = new userSchema({fullName , email , password , otp:OTP , otpExpiry:Date.now() })
        console.log(user)
        await user.save()
        responseHandler.success(res, "user Registered Successfully")
    }
    catch(err){
        responseHandler.error(res , "Internal Server Error")
        console.log(err)
    }

}

module.exports = register