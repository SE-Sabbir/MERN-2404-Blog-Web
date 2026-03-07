import React, { useMemo } from 'react'
import StatCard from './StatCard'
import { useGetListByUserQuery } from '../../service/api'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const OverView = () => {
  const { data, isLoading } = useGetListByUserQuery();

  const totalPosts = data?.data?.pagination?.totalItems || 0;

  const totalViews = useMemo(() => {
    if (!data?.data?.data) return 0;
    return data.data.data.reduce((acc, current) => acc + (current.views || 0), 0);
  }, [data]);

  const subscribers = 0; // Not currently tracked in the database

  // Format data for the chart
  const chartData = useMemo(() => {
    if (!data?.data?.data) return [];
    // Only show up to the latest 10 posts on the chart, reverse them to be chronological
    return data.data.data.slice(0, 10).map(post => ({
      name: post.title.length > 15 ? post.title.substring(0, 15) + '...' : post.title,
      views: post.views || 0,
    })).reverse();
  }, [data]);

  return (
    <div className="flex flex-col gap-6 mb-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Total Views" value={isLoading ? "..." : totalViews} color="indigo" />
        <StatCard label="Subscribers" value={isLoading ? "..." : subscribers} color="violet" />
        <StatCard label="Total Posts" value={isLoading ? "..." : totalPosts} color="emerald" />
      </div>

      {/* Analytics Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-gray-100 flex flex-col gap-4">
        <h3 className="text-lg font-bold text-gray-900">Recent Post Views Analytics</h3>
        <div className="h-80 w-full mt-2">
          {isLoading ? (
            <div className="w-full h-full flex items-center justify-center text-gray-400 font-medium">Loading chart data...</div>
          ) : chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight='auto' debounce={1}>
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6b7280' }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} tickLine={false} axisLine={false} />
                <Tooltip
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: '1px solid #f1f5f9', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar
                  dataKey="views"
                  fill="#6366f1"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={50}
                  animationDuration={1500}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 font-medium bg-gray-50 rounded-xl border border-dashed border-gray-200">
              No data available to display
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default OverView