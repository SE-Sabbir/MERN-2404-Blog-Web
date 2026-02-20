import React from 'react'
import {  LogOut,Zap, MoreVertical,Edit,Trash2,} from 'lucide-react'
import { useGetListByUserQuery } from '../../service/api'

const PostList = () => {
  const {data , isLoading , error} = useGetListByUserQuery()
  console.log("list data",data)
  //   const posts = [
  //   { id: 1, title: "Mastering React Server Components", status: "Published", date: "Oct 24, 2023", views: "1.2k" },
  //   { id: 2, title: "Designing for the Modern Web", status: "Draft", date: "Oct 22, 2023", views: "0" },
  //   { id: 3, title: "The Future of AI in Coding", status: "Published", date: "Oct 20, 2023", views: "850" },
  // ];
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
              {data?.data?.data.map((post) => (
                <tr key={post._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{post.title}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                      post.status === 'Published' ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'
                    }`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{post.createdAt}</td>
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
  )
}

export default PostList