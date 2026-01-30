import React, { useState } from 'react'
import { User, Lock, Bell, Camera, Globe, Mail, ShieldCheck, Save } from 'lucide-react';

const Settings = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [profileImg, setProfileImg] = useState("https://i.pravatar.cc/150?u=alex");

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
        setProfileImg(URL.createObjectURL(file));
        }
    };

    const tabs = [
        { id: 'profile', label: 'Public Profile', icon: User },
        { id: 'security', label: 'Security', icon: Lock },
        { id: 'notifications', label: 'Notifications', icon: Bell },
    ];
  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
      {/* Tab Navigation */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-2xl mb-8 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === tab.id 
              ? 'bg-white text-indigo-600 shadow-sm' 
              : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        {/* --- 1. PROFILE SECTION --- */}
        {activeTab === 'profile' && (
          <div className="p-8 space-y-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Profile Information</h3>
              <p className="text-gray-500 text-sm">Update your photo and personal details.</p>
            </div>

            {/* Photo Upload */}
            <div className="flex items-center gap-6">
              <div className="relative group">
                <img 
                  src={profileImg} 
                  alt="Profile" 
                  className="w-24 h-24 rounded-3xl object-cover border-4 border-indigo-50" 
                />
                <label className="absolute inset-0 flex items-center justify-center bg-black/40 text-white rounded-3xl opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                  <Camera size={20} />
                  <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                </label>
              </div>
              <div>
                <button className="text-sm font-bold text-indigo-600 hover:underline">Change Avatar</button>
                <p className="text-xs text-gray-400 mt-1">JPG, GIF or PNG. Max size 2MB.</p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputGroup label="Full Name" placeholder="Alex Rivera" icon={User} />
              <InputGroup label="Email Address" placeholder="alex@devblog.com" icon={Mail} />
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">Short Bio</label>
                <textarea 
                  rows="4" 
                  placeholder="Tell the world about yourself..." 
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
                />
              </div>
              <InputGroup label="Location" placeholder="San Francisco, CA" icon={Globe} />
              <InputGroup label="Website" placeholder="https://alexrivera.dev" icon={Globe} />
            </div>
          </div>
        )}

        {/* --- 2. SECURITY SECTION --- */}
        {activeTab === 'security' && (
          <div className="p-8 space-y-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Security Settings</h3>
              <p className="text-gray-500 text-sm">Manage your password and account protection.</p>
            </div>

            <div className="space-y-6 max-w-md">
              <InputGroup label="Current Password" type="password" placeholder="••••••••" icon={Lock} />
              <hr className="border-gray-100" />
              <InputGroup label="New Password" type="password" placeholder="••••••••" icon={ShieldCheck} />
              <InputGroup label="Confirm New Password" type="password" placeholder="••••••••" icon={ShieldCheck} />
            </div>

            <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl">
              <p className="text-sm text-amber-700">
                <strong>Pro Tip:</strong> Use at least 12 characters, including numbers and symbols, for a strong password.
              </p>
            </div>
          </div>
        )}

        {/* --- 3. NOTIFICATIONS SECTION --- */}
        {activeTab === 'notifications' && (
          <div className="p-8 space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Notification Preferences</h3>
            <div className="space-y-4">
              <ToggleRow title="Email Notifications" description="Receive updates about your posts via email." defaultChecked />
              <ToggleRow title="Comments" description="Get notified when someone comments on your blog." defaultChecked />
              <ToggleRow title="Marketing" description="Receive news about new features and products." />
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
          <button className="px-6 py-2.5 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition-all">
            Discard
          </button>
          <button className="flex items-center gap-2 px-8 py-2.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-95">
            <Save size={18} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Helper Components ---
const InputGroup = ({ label, icon: Icon, ...props }) => (
  <div>
    <label className="block text-sm font-bold text-gray-700 mb-2">{label}</label>
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
        <Icon size={18} />
      </div>
      <input 
        className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
        {...props}
      />
    </div>
  </div>
);

const ToggleRow = ({ title, description, defaultChecked }) => (
  <div className="flex items-center justify-between py-2">
    <div>
      <p className="font-bold text-gray-900">{title}</p>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" className="sr-only peer" defaultChecked={defaultChecked} />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
    </label>
  </div>
);

export default Settings