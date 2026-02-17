import React, { useState } from 'react'
import { Mail, Lock, Zap, Chrome, Github } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import Navbar from '../components/Layout/Navbar';
import { useLoginMutation } from '../service/api';

const Login = () => {
  const [login,{data, error,isLoading, isSuccess}] = useLoginMutation()
  const navigate = useNavigate()
  const [formData , setFormData]= useState({
    email: "",
    password: "",
  });
  const handelChange = (e) =>{
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }
  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      const res = await login(formData).unwrap();
      console.log(res.message)
      if(res.success){
        navigate("/dashboard")
      }
    } catch (error) {
      console.log(error)
    } finally{
      console.log("Data",data)
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
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="mt-2 text-gray-500">Please enter your details to sign in</p>
        </div>
        
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <div className="mt-1 relative">
                <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                <input type="email" name="email" value={formData.email} onChange={handelChange} placeholder="you@example.com" className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Password</label>
              <div className="mt-1 relative">
                <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
                <input type="password" name="password" value={formData.password} onChange={handelChange} placeholder="••••••••" className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
              </div>
            </div>
          </div>

          <button className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
            Sign In
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
          <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-400">Or continue with</span></div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="flex items-center justify-center py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <Chrome size={18} className="mr-2 text-red-500" /> Google
          </button>
          <button className="flex items-center justify-center py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <Github size={18} className="mr-2" /> GitHub
          </button>
        </div>

        <p className="text-center text-sm text-gray-500">
          Don't have an account? <Link to="/register" className="text-indigo-600 font-semibold hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
    </>
  )
}

export default Login