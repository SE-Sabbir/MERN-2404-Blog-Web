import React from 'react'
import StatCard from './StatCard'

const OverView = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      <StatCard label="Total Views" value="48.2k" color="indigo" />
      <StatCard label="Subscribers" value="1,240" color="violet" />
      <StatCard label="Live Posts" value="18" color="emerald" />
    </div>
  )
}

export default OverView