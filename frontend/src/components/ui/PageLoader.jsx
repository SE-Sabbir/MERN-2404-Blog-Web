import React from 'react';

const PageLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-md">
      <div className="relative">
        {/* Outer Glowing Ring */}
        <div className="w-20 h-20 rounded-full border-4 border-indigo-50 border-t-indigo-600 animate-spin"></div>
        
        {/* Inner Pulsing Circle */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 bg-gradient-to-tr from-indigo-600 to-violet-500 rounded-2xl rotate-12 animate-pulse shadow-lg shadow-indigo-200"></div>
        </div>
      </div>
      
      {/* Loading Text */}
      <div className="mt-6 flex flex-col items-center">
        <h2 className="text-lg font-bold text-gray-900 tracking-tight">Preparing your story</h2>
        <div className="flex gap-1 mt-2">
          <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce"></span>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;