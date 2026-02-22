const userSchema = require("../models/userSchema")
const { emailRegex, passwordRegex } = require("../services/allRegex")
const { uploadToCloudinary, deleteFromCloudinary } = require("../services/cloudinaryConfig")
const sendMail = require("../services/mailSender")
const { verifyOtpTemplate, resetPasswordTemplate } = require("../services/mailTemplate")
const responseHandler = require("../services/responseHandler")
const { generateOTP, generateAccessToken, generateRefreshToken, generateResetPasswordToken, verifyToken } = require("../services/utils")
const crypto = require('crypto');


// ------------------Register Controller----------------------
const registerUser = async (req , res)=>{
    try{
        const {fullName , email , password} = req.body
        if(!fullName) {return responseHandler.error(res,"UserName required" , 400)}
        if(!emailRegex.test(email)) {return responseHandler.error(res , "Email is not valid" , 400)}
        if(password.length < 6 || password.length > 12 ) {return responseHandler.error(res, "Password need minimum 6 letter " ,400)}
        if(!passwordRegex.test(password)) {return responseHandler.error(res , "Please enter a strong password" , 400)}
        // ------find user with email
        const existindUser = await userSchema.findOne({email})
        if(existindUser) {return responseHandler.error(res , "Email already registered")}
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
        if(!email) {return responseHandler.error(res , "Email is required")}
        if(!otp) {return responseHandler.error(res , "Otp is required")}
        // ------find user with email otp & otpExpiry date
        const user = await userSchema.findOne({email, otp , otpExpiry:{$gt: Date.now() }})
        if(!user) {return responseHandler.error(res , "Invalid or expired OTP", 400)}
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
        if(!email) {return responseHandler.error(res , "Email is required" , 400)}
        if(!password) {return responseHandler.error(res , "Password is required" , 400)}
        // ------find user with email
        const user = await userSchema.findOne({email})
        if(!user) {return responseHandler.error(res , "Invalid Credentials" , 400)}
        if(!user.isVerified) {return responseHandler.error(res , "Email is not verified")}
        // ------password compare form db
        const isPasswordValid = await user.verifyPassword(password)
        if(!isPasswordValid){ return responseHandler.error(res , "Invalid Credentials" , 400)}
        // ----- generate access token form user
        const accessToken = generateAccessToken(user._id, user.email, user.role)
        const refreshToken = generateRefreshToken(user._id, user.email, user.role)
        // ----- if password true then show successfull
        res.cookie("x-acc-tkn", accessToken ,{
            httpOnly: true,
            secure: false
        }).cookie("x-ref-tkn" , refreshToken , {
            httpOnly: true,
            secure: false
        })
        responseHandler.success(res , "Login successfull")
    }
    catch(err){
        responseHandler.error(res, "Internal Server Error")
        console.log(err)
    }
}
// ------------------Forgate Password Controller----------------------
const forgatePassword = async (req , res)=>{
    try{
        const {email} = req.body
        if(!email) {return responseHandler.error(res , "Email is required" , 400)}
        const existUser = await userSchema.findOne({email})
        if(!existUser) {return responseHandler.error(res , "Email not registered" , 400)}
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
// ------------------Reset Password Controller----------------------
const resetPassword =async(req , res)=>{
    try{
        const {newPassword} = req.body
        const {token} = req.params;
        if(!newPassword){return responseHandler.error(res , "New Password is required" , 400)}
        if(!token) {return responseHandler.error(res , "Invalid Request" , 400)}
        const hashToken = crypto.createHash('sha256').update(token).digest('hex');

        const user = await userSchema.findOne({
            resetPasswordToken:hashToken,resetPasswordExpiry:{$gt:Date.now()}
        })
        if(!user) {return responseHandler.error(res , "Invalid or expired token", 400)}
        user.password = newPassword;
        user.resetPasswordToken = null;
        user.resetPasswordExpiry = null;
        await user.save();
        responseHandler.success(res , "Password reset successfully")
    }
    catch(err){
        responseHandler.error(res , "Internal Server Error")
        console.log(err)
    }
}
// ------------------Get User Profile Controller----------------------
const getUserProfile = async(req , res)=>{
    try{
        const user = await userSchema.findById(req.user._id).select("fullName email role avatar")
        responseHandler.success(res , "User Profile fetched successfully" , user)
    }
    catch(err){
        responseHandler.error(res, "Internal Server Error")
    }
}
// ------------------Update User Profile Controller----------------------
const updateProfile = async(req , res)=>{
    try{
        const {fullName} = req.body
        const existingUser = await userSchema.findById(req.user._id).select("fullName email role avatar")
        if(fullName) existingUser.fullName = fullName

        if(req.file) {
            deleteFromCloudinary(existingUser.avatar)
            const uploadImage = await uploadToCloudinary(req.file.buffer)
            if(uploadImage?.secure_url) existingUser.avatar = uploadImage.secure_url
        }
        existingUser.save()
        
        responseHandler.success(res , "Profile update Successfully", existingUser)
    }
    catch(err){
        responseHandler.error(res , "Internal Server Error")
        console.log(err)
    }
}
// ------------------Update User Profile Controller----------------------
const refreshAccessToken = async(req , res)=>{
    try {
        const refreshToken = req.cookies["x-ref_tkn"];
        if(!refreshToken) return responseHandler.error(res , "Unauthorized access", 401);
        const decoded = verifyToken(refreshToken);
        if(!decoded) return responseHandler.error(res , "Unauthorized access", 401);
        const accessToken = generateAccessToken(decoded._id, decoded.email, decoded.role);
        res.cookie("x-acc_tkn",accessToken,{
            httpOnly:true,
            secure:false,
        });
        responseHandler.success(res , "Access token refreshed successfullty");
    } catch (error) {
        responseHandler.error(res , "Internal Server Error")
    }
}
// ------------------Logout User Profile Controller----------------------
const logOut = async(req , res)=>{
    try {
        const cookieOptions = {
            httpOnly: true,
            secure: false,
            sameSite: 'Lax',
            path: '/'
        };
        res.clearCookie('x-acc-tkn', cookieOptions);
        res.clearCookie('x-ref-tkn', cookieOptions);

        console.log('Logout triger hossa')
        responseHandler.success(res , "Logged out successfully");
    } catch (error) {
        responseHandler.error(res, "Internal Server Error")
    }
}


module.exports = {registerUser , verifyOTP , loginUser ,forgatePassword , resetPassword , getUserProfile , updateProfile , refreshAccessToken , logOut}