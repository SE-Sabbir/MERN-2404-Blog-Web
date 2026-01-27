import React from 'react'
import { User, Mail, Lock, Zap } from 'lucide-react';
import { Link } from 'react-router';
import Navbar from '../components/Layout/Navbar';

const Registration = () => {
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

        <form className="mt-8 space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Full Name</label>
            <div className="mt-1 relative">
              <User className="absolute left-3 top-3 text-gray-400" size={18} />
              <input type="text" placeholder="John Doe" className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <div className="mt-1 relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
              <input type="email" placeholder="you@example.com" className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <div className="mt-1 relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
              <input type="password" placeholder="••••••••" className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" />
            </div>
          </div>

          <button className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold mt-4 hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
            Create Account
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