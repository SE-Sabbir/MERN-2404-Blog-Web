import React, { useState } from 'react';
import { PlusCircle, Menu} from 'lucide-react';
import Sidebar from '../components/Layout/Sidebar';
import CreatePost from '../components/ui/CreatePost';
import PostList from '../components/ui/PostList';
import OverView from '../components/ui/OverView';
import Settings from '../components/ui/Settings';
import { useGetListByUserQuery } from '../service/api';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar - Your component is perfect! */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
      />

      {/* Main Content Area */}
      {/* Use h-screen and overflow-y-auto to keep the sidebar fixed while content scrolls */}
      <main className="flex-1 h-screen overflow-y-auto p-4 md:p-8">
        <header className="flex justify-between items-center mb-8 bg-white/50 backdrop-blur-md sticky top-0 py-4 z-10">
          <div className="flex items-center gap-4">
            
            {/* THIS IS THE MISSING BUTTON FOR MOBILE */}
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 text-gray-600 hover:bg-white rounded-xl border border-gray-200 shadow-sm transition-all"
            >
              <Menu size={24} />
            </button>

            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 capitalize">
                {activeTab.replace('-', ' ')}
              </h1>
              <p className="text-gray-500 text-xs md:text-sm">Welcome back, Alex.</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setActiveTab('create')}
              className="bg-indigo-600 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-medium hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-lg shadow-indigo-100"
            >
              <PlusCircle size={18} /> 
              <span className="hidden sm:inline">New Post</span>
            </button>
            <img src="https://i.pravatar.cc/150?u=alex" className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-gray-200" alt="Avatar" />
          </div>
        </header>

        {/* Dynamic Views */}
        <div className="max-w-6xl mx-auto">
          {activeTab === 'posts' && <PostList />}
          {activeTab === 'create' && <CreatePost />}
          {activeTab === 'overview' && <OverView/> }
          {activeTab === 'settings' && <Settings/> }
        </div>
      </main>
    </div>
  );
};

export default Dashboard;