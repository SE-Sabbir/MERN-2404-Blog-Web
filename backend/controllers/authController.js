const userSchema = require("../models/userSchema")
const { emailRegex, passwordRegex } = require("../services/allRegex")
const sendMail = require("../services/mailSender")
const { verifyOtpTemplate } = require("../services/mailTemplate")
const responseHandler = require("../services/responseHandler")
const { generateOTP } = require("../services/utils")

const register = async (req , res)=>{
    try{
        const {fullName , email , password} = req.body
        if(!fullName) return responseHandler.error(res,"UserName required" , 400)
        if(!emailRegex.test(email)) return responseHandler.error(res , "Email is not valid" , 400)
        if(password.length < 6 || password.length > 12 ) return responseHandler.error(res, "Password need minimum 6 letter " ,400)
        if(!passwordRegex.test(password)) return responseHandler.error(res , "Please enter a strong password" , 400)
        const existindUser = await userSchema.findOne({email})
        if(existindUser) return responseHandler.error(res , "Email already registered")
        const OTP = generateOTP()
        const user = new userSchema({fullName , email , password , otp:OTP , otpExpiry:Date.now() })
        console.log(user)
        await user.save()
        sendMail(email , 'Verify OTP' , verifyOtpTemplate(fullName,OTP) )
        responseHandler.success(res, "user Registered Successfully")
    }
    catch(err){
        responseHandler.error(res , "Internal Server Error")
        console.log(err)
    }

}

module.exports = register