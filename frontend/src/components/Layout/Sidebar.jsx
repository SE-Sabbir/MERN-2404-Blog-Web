import React from 'react'
import { LayoutDashboard, FileText, PlusCircle, Settings, BarChart3, LogOut, Zap, X } from 'lucide-react';
const Sidebar = ({ isOpen, setIsOpen, activeTab, setActiveTab }) => {
    const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'posts', label: 'My Posts', icon: FileText },
    { id: 'create', label: 'Create Post', icon: PlusCircle },
    { id: 'stats', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];
  return (
    <>
      {/* 1. Mobile Backdrop (Glass effect) */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* 2. Sidebar Container */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white/80 backdrop-blur-xl border-r border-gray-100 
        transform transition-all duration-300 ease-in-out shadow-2xl lg:shadow-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:inset-0
      `}>
        
        {/* Logo Section */}
        <div className="p-8 flex items-center justify-between">
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

        {/* Navigation Links */}
        <nav className="flex-1 px-6 space-y-2 mt-4">
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

        {/* Bottom User Section */}
        <div className="p-6 border-t border-gray-100">
          <div className="flex items-center gap-3 p-3 mb-4">
            <img src="https://i.pravatar.cc/150?u=alex" className="w-10 h-10 rounded-xl border-2 border-indigo-100" alt="User" />
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-gray-900 truncate">Alex Rivera</p>
              <p className="text-xs text-gray-500 truncate">Admin Account</p>
            </div>
          </div>
        </div>
        <div className="p-4 border-t border-gray-100">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 rounded-xl transition-all">
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>
    </>
  )
}

export default Sidebar