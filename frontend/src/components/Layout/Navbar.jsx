import React, { useState } from 'react'
import { Menu, X, Search, Zap, UserCircle } from 'lucide-react';
import { Link } from 'react-router';
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Articles', href: '#' },
    { name: 'Newsletter', href: '#' },
    { name: 'About', href: '#' },
  ];
  return (
    <nav className="fixed w-full z-50 top-0 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo Section */}
          <Link to='/' className="flex-shrink-0 flex items-center gap-2 group cursor-pointer">
            <div className="bg-indigo-600 p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
              <Zap size={20} className="text-white fill-current" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              DevBlog
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-8 mr-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-600 hover:text-indigo-600 font-medium transition-colors duration-200 text-sm"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3 border-l pl-6 border-gray-100">
              <button className="p-2 text-gray-400 hover:text-indigo-600 transition-colors">
                <Search size={18} />
              </button>
              
              {/* Login Button - Ghost Style */}
              <Link to="/login" className="text-gray-600 hover:text-indigo-600 font-medium text-sm px-4 py-2 transition-colors flex items-center gap-2">
                Log in
              </Link>

              {/* Subscribe Button - Primary Style */}
              <button className="bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 active:scale-95">
                Subscribe
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-indigo-600 focus:outline-none p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden absolute w-full bg-white border-b border-gray-100 shadow-xl transition-all duration-300">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-3 py-3 text-base font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"
              >
                {link.name}
              </a>
            ))}
            
            <div className="pt-4 border-t border-gray-100 mt-4 space-y-3">
              <button className="w-full flex items-center justify-center gap-2 text-gray-600 font-medium py-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <UserCircle size={18} />
                Log in
              </button>
              <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium shadow-md">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar