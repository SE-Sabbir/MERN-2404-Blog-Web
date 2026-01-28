import React, { useState } from 'react';
import { PlusCircle, Edit,Trash2,Image as ImageIcon} from 'lucide-react';
import Sidebar from '../components/Layout/Sidebar';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('posts');

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar/>

      {/* Main Content Area */}
      <main className="flex-1 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 capitalize">{activeTab.replace('-', ' ')}</h1>
            <p className="text-gray-500 text-sm">Welcome back, Alex.</p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setActiveTab('create')}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-all flex items-center gap-2"
            >
              <PlusCircle size={18} /> New Post
            </button>
            <img src="https://i.pravatar.cc/150?u=alex" className="w-10 h-10 rounded-full border border-gray-200" alt="Avatar" />
          </div>
        </header>

        {/* Dynamic Views */}
        {activeTab === 'posts' && <PostList />}
        {activeTab === 'create' && <CreatePost />}
        {activeTab === 'overview' && <div className="p-12 border-2 border-dashed border-gray-200 rounded-3xl text-center text-gray-400">Overview Stats Coming Soon</div>}
      </main>
    </div>
  );
};

// --- Sub-Component: Post List Table ---
const PostList = () => {
  const posts = [
    { id: 1, title: "Mastering React Server Components", status: "Published", date: "Oct 24, 2023", views: "1.2k" },
    { id: 2, title: "Designing for the Modern Web", status: "Draft", date: "Oct 22, 2023", views: "0" },
    { id: 3, title: "The Future of AI in Coding", status: "Published", date: "Oct 20, 2023", views: "850" },
  ];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-50 border-b border-gray-100">
          <tr>
            <th className="px-6 py-4 text-sm font-semibold text-gray-600">Post Title</th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-600">Date</th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-600">Views</th>
            <th className="px-6 py-4 text-sm font-semibold text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {posts.map((post) => (
            <tr key={post.id} className="hover:bg-gray-50/50 transition-colors">
              <td className="px-6 py-4 font-medium text-gray-900">{post.title}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                  post.status === 'Published' ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'
                }`}>
                  {post.status}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">{post.date}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{post.views}</td>
              <td className="px-6 py-4">
                <div className="flex gap-2">
                  <button className="p-1 text-gray-400 hover:text-indigo-600"><Edit size={18} /></button>
                  <button className="p-1 text-gray-400 hover:text-red-600"><Trash2 size={18} /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// --- Sub-Component: Writing Interface ---
const CreatePost = () => {
  return (
    <div className="max-w-4xl space-y-6">
      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Post Title</label>
          <input 
            type="text" 
            placeholder="Enter a catchy title..." 
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-lg font-semibold"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none">
              <option>Development</option>
              <option>Design</option>
              <option>Technology</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail</label>
            <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 hover:text-indigo-600 hover:border-indigo-600 transition-all">
              <ImageIcon size={20} /> Upload Image
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
          <textarea 
            rows="12" 
            placeholder="Write your story here..." 
            className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button className="px-6 py-2.5 rounded-xl font-medium text-gray-600 hover:bg-gray-50">Save Draft</button>
          <button className="px-8 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 shadow-lg shadow-indigo-100">
            Publish Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;