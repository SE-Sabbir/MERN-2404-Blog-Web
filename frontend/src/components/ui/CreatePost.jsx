import { ImageIcon, Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import { useCreateBlogMutation } from '../../service/api';
import { toast } from 'react-hot-toast'; // Optional: for notifications

const CreatePost = () => {
  // 1. State for form fields
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Development');
  const [content, setContent] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [preview, setPreview] = useState(null);

  const [createBlog, { isLoading }] = useCreateBlogMutation();

  // 2. Handle Image Selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      setPreview(URL.createObjectURL(file)); // Create a preview URL
    }
  };

  // 3. Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content || !thumbnail) {
      return toast.error("Please fill all fields and upload a thumbnail");
    }
    console.log("click hossa")

    // Prepare FormData for multipart/form-data request
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('tags', category); // Your backend calls it 'tags'
    formData.append('thumbnail', thumbnail); // 'thumbnail' matches your backend req.file

    try {
      await createBlog(formData).unwrap();
      toast.success("Post published successfully!");
      // Reset form
      setTitle('');
      setContent('');
      setThumbnail(null);
      setPreview(null);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to create post");
      console.log(error)
    }
  };

  return (
    <div className="max-w-4xl space-y-6">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
        
        {/* Title Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Post Title</label>
          <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a catchy title..." 
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-lg font-semibold"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Category Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer"
            >
              <option value="Development">Development</option>
              <option value="Design">Design</option>
              <option value="Technology">Technology</option>
            </select>
          </div>

          {/* Thumbnail Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail</label>
            <label className="w-full flex flex-col items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 hover:text-indigo-600 hover:border-indigo-600 transition-all cursor-pointer overflow-hidden h-[52px]">
              {preview ? (
                <span className="text-indigo-600 font-medium truncate w-full text-center">{thumbnail.name}</span>
              ) : (
                <div className="flex items-center gap-2">
                   <ImageIcon size={20} /> 
                   <span>Upload Image</span>
                </div>
              )}
              <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
            </label>
          </div>
        </div>

        {/* Content Textarea */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
          <textarea 
            rows="12" 
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your story here..." 
            className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4">
          <button type="button" className="px-6 py-2.5 rounded-xl font-medium text-gray-600 hover:bg-gray-50 transition-all">
            Save Draft
          </button>
          <button 
            type="submit" 
            disabled={isLoading}
            className="px-8 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all flex items-center gap-2 disabled:bg-indigo-400"
          >
            {isLoading ? <Loader2 className="animate-spin" size={18} /> : 'Publish Post'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;