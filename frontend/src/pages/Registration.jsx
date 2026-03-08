import React from 'react'
import { User, Mail, Lock, Zap, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import Navbar from '../components/Layout/Navbar';
import { useState } from 'react';
import { useRegisterUserMutation } from '../service/api';
import toast from 'react-hot-toast';

const Registration = () => {

  const [register,{data, error, isLoading}] = useRegisterUserMutation();
  const navigate = useNavigate()
  const [formData , setFormData] = useState({
    fullName:"",
    email:"",
    password:"",
  });
  const handelChange = (e) =>{
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    })
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
      const res = await register(formData).unwrap();
      if(res.success){
        navigate("/verify-otp",{
          state:{
            email:formData.email
          }
        })
        toast.success("Verify OTP to Your Email")
      }
    } catch (error) {
      toast.error(error?.data?.message || "Failed to Register")
      console.log(error)
    }
  }
  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center">
          <div className="inline-flex bg-indigo-600 p-2 rounded-xl mb-4">
            <Zap size={24} className="text-white fill-current" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="mt-2 text-gray-500">Join our community of developers today</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Full Name</label>
            <div className="mt-1 relative">
              <User className="absolute left-3 top-3 text-gray-400" size={18} />
              <input type="text" name='fullName' value={formData.fullName} onChange={handelChange} placeholder="John Doe" className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <div className="mt-1 relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
              <input type="email" name='email' value={formData.email} onChange={handelChange} placeholder="you@example.com" className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <div className="mt-1 relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
              <input type="password" name='password' value={formData.password} onChange={handelChange} placeholder="••••••••" className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
            </div>
          </div>

          <button
          disabled={isLoading}
          className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold mt-4 hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : "Create Account"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500">
          Already have an account? <Link to="/login" className="text-indigo-600 font-semibold hover:underline">Log In</Link>
        </p>
      </div>
    </div>
    </>
  )
}

export default Registration