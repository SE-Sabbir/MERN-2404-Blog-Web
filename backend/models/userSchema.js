const mongoose = require('mongoose')
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    fullName:{type:String , required:true},
    email:{type:String , required:true, unique:true},
    password:{type:String , required:true},
    role:{type:String , enum:["user" , "admin"] , default:"user"},
    isVerified:{type:Boolean , default:false},
    otp:{type:String},
    otpExpiry:{type:Date},
    resetPasswordToken:{type:String},
    resetPasswordExpiry:{type:Date}
} , {timestamps:true})

// Hash password before saving
userSchema.pre("save", async function () {
  // If password is not modified, skip hashing
  if (!this.isModified("password")) return;

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    throw new Error("Error hashing password");
    
  }
});

// 🔑 Compare password during login
userSchema.methods.verifyPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


module.exports = mongoose.model("user" , userSchema)