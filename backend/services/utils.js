const jwt = require('jsonwebtoken')
const crypto = require('crypto');

// -------generate otp
const generateOTP = () =>{
    return Math.floor(Math.random()*9000).toString()
}
// -------generate access token
const generateAccessToken = ( _id, email , role) =>{
    return jwt.sign(
    {
    _id,
    email,
    role
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' });
}
// -------generate Refresh token
const generateRefreshToken = ( _id, email , role) =>{
    return jwt.sign(
    {
    _id,
    email,
    role
    },
    process.env.JWT_SECRET,
    { expiresIn: '5d' });
}
// ----- generate ResetPassword Token
const generateResetPasswordToken = () =>{
    const resetPasswordToken = crypto.randomBytes(16).toString('hex')
    const hashToken = crypto.createHash('sha256').update(resetPasswordToken).digest('hex');

    return {resetPasswordToken , hashToken}
}

module.exports = {generateOTP , generateAccessToken , generateRefreshToken , generateResetPasswordToken}