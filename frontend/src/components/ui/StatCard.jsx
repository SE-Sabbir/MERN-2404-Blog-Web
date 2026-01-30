import React from 'react'

const StatCard = ({ label, value, color }) => {
  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
    <p className="text-sm font-semibold text-gray-500 mb-1">{label}</p>
    <p className={`text-3xl font-bold text-${color}-600`}>{value}</p>
  </div>
  )
}

export default StatCard