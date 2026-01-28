import React from 'react'

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
  )
}

export default CreatePost