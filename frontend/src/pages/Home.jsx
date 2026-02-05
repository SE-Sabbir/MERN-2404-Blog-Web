import React from 'react'
import BlogCard from '../components/ui/BlogCard';
import { useGetBlogListQuery } from '../service/api';

const Home = () => {

  const {data , isLoading , error} = useGetBlogListQuery()
  console.log(data)

  
    const posts = [
    {
      id: 1,
      title: "Mastering React Server Components",
      excerpt: "Dive deep into the new era of React with Server Components. Learn how to optimize performance and reduce bundle sizes...",
      category: "Development",
      date: "Oct 24, 2023",
      readTime: "8 min read",
      author: "Alex Rivera",
      authorAvatar: "https://i.pravatar.cc/150?u=alex",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Designing for the Modern Web",
      excerpt: "Explore the latest design trends from glassmorphism to bento grids. How to stay relevant in a fast-changing visual landscape...",
      category: "Design",
      date: "Oct 22, 2023",
      readTime: "5 min read",
      author: "Sarah Chen",
      authorAvatar: "https://i.pravatar.cc/150?u=sarah",
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "The Future of AI in Coding",
      excerpt: "Is AI replacing developers or empowering them? We look at how LLMs are changing the way we write, debug, and ship code...",
      category: "Tech",
      date: "Oct 20, 2023",
      readTime: "12 min read",
      author: "Marcus Thorne",
      authorAvatar: "https://i.pravatar.cc/150?u=marcus",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 5,
      title: "Designing for the Modern Web",
      excerpt: "Explore the latest design trends from glassmorphism to bento grids. How to stay relevant in a fast-changing visual landscape...",
      category: "Design",
      date: "Oct 22, 2023",
      readTime: "5 min read",
      author: "Sarah Chen",
      authorAvatar: "https://i.pravatar.cc/150?u=sarah",
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 6,
      title: "The Future of AI in Coding",
      excerpt: "Is AI replacing developers or empowering them? We look at how LLMs are changing the way we write, debug, and ship code...",
      category: "Tech",
      date: "Oct 20, 2023",
      readTime: "12 min read",
      author: "Marcus Thorne",
      authorAvatar: "https://i.pravatar.cc/150?u=marcus",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80"
    },{
      id: 4,
      title: "Mastering React Server Components",
      excerpt: "Dive deep into the new era of React with Server Components. Learn how to optimize performance and reduce bundle sizes...",
      category: "Development",
      date: "Oct 24, 2023",
      readTime: "8 min read",
      author: "Alex Rivera",
      authorAvatar: "https://i.pravatar.cc/150?u=alex",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80"
    }
  ];
  
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider text-indigo-600 uppercase bg-indigo-50 rounded-full">
              The Developer's Journal
            </span>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 tracking-tight mb-6">
              Insights for the <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Modern Dev</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-10">
              Weekly deep-dives into frontend architecture, UI design, and the evolving world of software engineering.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 active:scale-95">
                Start Reading
              </button>
              <button className="bg-white text-gray-700 border border-gray-200 px-8 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all active:scale-95">
                View Topics
              </button>
            </div>
          </div>
        </div>
        
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-indigo-50 rounded-full blur-3xl opacity-50 -z-10" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[600px] h-[600px] bg-violet-50 rounded-full blur-3xl opacity-50 -z-10" />
      </section>

      {/* Post Grid Section */}
      <section className="py-20 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Latest Stories</h2>
              <p className="text-gray-500 mt-2">Fresh off the press from our contributors</p>
            </div>
            <button className="text-indigo-600 font-semibold hover:underline hidden sm:block">
              View All Posts
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map ((item)=>(
                <BlogCard key={item.id} post={item} />
            ))}
            {/* {posts.map(post => (
              <BlogCard key={post.id} post={post} />
            ))} */}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home