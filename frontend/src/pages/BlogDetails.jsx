import React, { useState } from 'react'
import { useParams, Link } from 'react-router';
import { Calendar, Clock, User, ArrowLeft, Send, MessageCircle } from 'lucide-react';

const BlogDetails = () => {
    const { slug } = useParams();
    const [comment, setComment] = useState("");

    // In a real app, you'd fetch this data from an API using the slug
    const post = {
        title: "Mastering React Server Components",
        content: `
        <p>React Server Components (RSC) are changing the game for web performance. By moving the rendering logic to the server, we can significantly reduce the amount of JavaScript sent to the client.</p>
        <p>Imagine a world where your complex data-heavy components don't bloat your bundle size. That's the promise of RSC. It allows developers to write components that run exclusively on the server, fetching data directly from your database or file system.</p>
        <blockquote>"The future of React isn't just about rendering faster; it's about rendering smarter."</blockquote>
        <p>In this guide, we'll explore how to implement these patterns in your next project...</p>
        `,
        category: "Development",
        date: "Oct 24, 2023",
        readTime: "8 min read",
        author: "Alex Rivera",
        authorAvatar: "https://i.pravatar.cc/150?u=alex",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80"
    };

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Post Header */}
      <header className="pt-10 pb-16 bg-gray-50/50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <Link to="/" className="inline-flex items-center text-indigo-600 font-medium mb-8 hover:gap-2 transition-all">
            <ArrowLeft size={18} className="mr-2" /> Back to Articles
          </Link>
          
          <div className="flex items-center gap-2 mb-6">
            <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full uppercase">
              {post.category}
            </span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-500 text-sm flex items-center gap-1">
              <Clock size={14} /> {post.readTime}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-8">
            {post.title}
          </h1>

          <div className="flex items-center gap-4">
            <img src={post.authorAvatar} alt={post.author} className="w-12 h-12 rounded-full border-2 border-white shadow-sm" />
            <div>
              <p className="text-gray-900 font-bold">{post.author}</p>
              <p className="text-gray-500 text-sm">{post.date}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 -mt-10">
        <img 
          src={post.image} 
          alt="Cover" 
          className="w-full h-100 object-cover rounded-3xl shadow-2xl mb-12 border-8 border-white"
        />
        
        <div 
          className="prose prose-lg prose-indigo max-w-none text-gray-700 leading-relaxed space-y-6"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <hr className="my-16 border-gray-100" />

        {/* Comment Section */}
        <section className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
          <div className="flex items-center gap-2 mb-8">
            <MessageCircle className="text-indigo-600" />
            <h2 className="text-2xl font-bold text-gray-900">Discussion</h2>
          </div>

          <div className="space-y-4">
            <label className="text-sm font-semibold text-gray-700">Leave a comment</label>
            <div className="relative">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="What are your thoughts on this?"
                rows="4"
                className="w-full p-4 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none shadow-sm"
              />
              <button 
                className="absolute bottom-4 right-4 bg-indigo-600 text-white p-2 rounded-xl hover:bg-indigo-700 transition-colors shadow-lg"
              >
                <Send size={20} />
              </button>
            </div>
          </div>

          {/* Sample Comment List */}
          <div className="mt-10 space-y-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center text-violet-700 font-bold">JD</div>
              <div className="flex-1 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex justify-between mb-2">
                  <span className="font-bold text-gray-900 text-sm">Jane Doe</span>
                  <span className="text-gray-400 text-xs">2 hours ago</span>
                </div>
                <p className="text-gray-600 text-sm">This was such an insightful read! I've been struggling with RSC bundle sizes and this cleared things up.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default BlogDetails