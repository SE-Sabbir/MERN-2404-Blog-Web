import React from 'react'
import { Link } from 'react-router';
import { LayoutDashboard, FileText, PlusCircle, Settings, BarChart3, LogOut, Zap, X } from 'lucide-react';
const Sidebar = ({ isOpen, setIsOpen, activeTab, setActiveTab }) => {
    const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'posts', label: 'My Posts', icon: FileText },
    { id: 'create', label: 'Create Post', icon: PlusCircle },
    { id: 'stats', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Admin Account', icon: Settings },
  ];
  return (
    <>
      {/* 1. Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* 2. Sidebar Container - Added 'flex flex-col' here */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white/80 backdrop-blur-xl border-r border-gray-100 
        flex flex-col transform transition-all duration-300 ease-in-out shadow-2xl lg:shadow-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:inset-0
      `}>
        
        {/* Logo Section */}
        <div className="p-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-200">
              <Zap size={20} className="text-white fill-current" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent tracking-tight">
              DevBlog
            </span>
          </div>
          <button onClick={() => setIsOpen(false)} className="lg:hidden p-2 text-gray-400 hover:bg-gray-100 rounded-full">
            <X size={20} />
          </button>
        </div>

        {/* Navigation Links - 'flex-1' pushes everything below it down */}
        <nav className="flex-1 px-6 space-y-2 mt-4 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                if(window.innerWidth < 1024) setIsOpen(false);
              }}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all group ${
                activeTab === item.id 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                : 'text-gray-500 hover:bg-indigo-50 hover:text-indigo-600'
              }`}
            >
              <item.icon size={20} className={activeTab === item.id ? 'text-white' : 'group-hover:scale-110 transition-transform'} />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Bottom Section - This will now always stay at the end */}
        <div className="shrink-0">
          {/* Logout Button */}
          <div className="px-6 pb-8">
            <Link to="/">
            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 cursor-pointer hover:bg-red-50 rounded-2xl transition-all group">
              <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
              Logout
            </button>
            </Link>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar