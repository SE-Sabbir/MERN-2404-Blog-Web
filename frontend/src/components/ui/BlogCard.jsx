import React from 'react'
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

const BlogCard = ({post , slug}) => {

   // -----date formate
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <article className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={post.thumbnail} 
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-4 left-4 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          {post.tags}
        </span>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            {formatDate(post.createdAt)}
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} />
            {post.readTime}
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2">
          {post.title}
        </h3>
        
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {post.content}
        </p>

        <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={post.author?.avatar} className="w-8 h-8 rounded-full border border-gray-100" alt={post.author?.fullName} />
            <span className="text-sm font-medium text-gray-700">{post.author?.fullName}</span>
          </div>
          <Link to={`/blog/${slug}`} className="text-indigo-600 font-semibold text-sm flex items-center gap-1 group/btn">
            Read More 
            <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  )
}

export default BlogCard