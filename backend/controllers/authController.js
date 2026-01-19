const userSchema = require("../models/userSchema")
const { emailRegex, passwordRegex } = require("../services/allRegex")
const sendMail = require("../services/mailSender")
const { verifyOtpTemplate, resetPasswordTemplate } = require("../services/mailTemplate")
const responseHandler = require("../services/responseHandler")
const { generateOTP, generateAccessToken, generateRefreshToken, generateResetPasswordToken } = require("../services/utils")

// ------------------Register Controller----------------------
const registerUser = async (req , res)=>{
    try{
        const {fullName , email , password} = req.body
        if(!fullName) return responseHandler.error(res,"UserName required" , 400)
        if(!emailRegex.test(email)) return responseHandler.error(res , "Email is not valid" , 400)
        if(password.length < 6 || password.length > 12 ) return responseHandler.error(res, "Password need minimum 6 letter " ,400)
        if(!passwordRegex.test(password)) return responseHandler.error(res , "Please enter a strong password" , 400)
        // ------find user with email
        const existindUser = await userSchema.findOne({email})
        if(existindUser) return responseHandler.error(res , "Email already registered")
        const OTP = generateOTP()
        const user = new userSchema({fullName , email , password , otp:OTP , otpExpiry:Date.now() + 10 * 60 * 1000 })
        await user.save()
        // ------ data save to db and send otp verification email
        sendMail(email , 'Verify OTP' , verifyOtpTemplate(fullName,OTP) )
        responseHandler.success(res, "user Registered Successfully")
    }
    catch(err){
        responseHandler.error(res , "Internal Server Error") 
        console.log(err)
    }
}
// ------------------OTP Verify Controller----------------------
const verifyOTP =async (req , res)=>{
    try{
        const {email , otp} = req.body
        if(!email) return responseHandler.error(res , "Email is required")
        if(!otp) return responseHandler.error(res , "Otp is required")
        // ------find user with email otp & otpExpiry date
        const user = await userSchema.findOne({email, otp , otpExpiry:{$gt: Date.now() }})
        if(!user) return responseHandler.error(res , "Invalid or expired OTP", 400)
        user.isVerified = true;
        user.otp = null;
        user.otpExpiry = null;
        await user.save()
        // ------db update and send Successfull
        responseHandler.success(res , "Email verification successfull")
    }
    catch(err){
        console.log(err)
    }
}
// ------------------Login Controller----------------------
const loginUser = async(req , res)=>{
    try{
        const {email , password} = req.body
        if(!email) return responseHandler.error(res , "Email is required" , 400)
        if(!password) return responseHandler.error(res , "Password is required" , 400)
        // ------find user with email
        const user = await userSchema.findOne({email})
        if(!user) return responseHandler.error(res , "Invalid Credentials" , 400)
        if(!user.isVerified) return responseHandler.error(res , "Email is not verified")
        // ------password compare form db
        const isPasswordValid = await user.verifyPassword(password)
        if(!isPasswordValid) return responseHandler.error(res , "Invalid Credentials" , 400)
        // ----- generate access token form user
        const accessToken = generateAccessToken(user._id, user.email, user.role)
        const refreshToken = generateRefreshToken(user._id, user.email, user.role)
        // ----- if password true then show successfull
        res.cookie("X-Acc-Tkn", accessToken).cookie("X-Ref-Tkn" , refreshToken)
        responseHandler.success(res , "Login successfull")
    }
    catch(err){
        responseHandler.error(res, "Internal Server Error")
        console.log(err)
    }
}
// ------------------ForgatePassword Controller----------------------
const forgatePassword = async (req , res)=>{
    try{
        const {email} = req.body
        if(!email) return responseHandler.error(res , "Email is required" , 400)
        const existUser = await userSchema.findOne({email})
        if(!existUser) return responseHandler.error(res , "Email not registered" , 400)
        const {resetPasswordToken , hashToken} = generateResetPasswordToken()

        existUser.resetPasswordToken = hashToken;
        existUser.resetPasswordExpiry = Date.now() + 10 * 60 * 1000;
        existUser.save();
        const resetPasswordLink = `${process.env.CLIENT_URL}/reset-password?token=${resetPasswordToken}`
        sendMail(email , 'Reset Your Password' , resetPasswordTemplate(existUser.fullName,resetPasswordLink))
        responseHandler.success(res , "Send Reset Password Link to Email")

    }
    catch(err){
        responseHandler.error(res , "Internal Server Error")
        console.log(err)
    }
}


module.exports = {registerUser , verifyOTP , loginUser ,forgatePassword}