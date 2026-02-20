import React from 'react'
import { Navigate, Outlet } from 'react-router'
import { useGetUserQuery } from '../../service/api'

const DashboardLayout = () => {
  const {data , isLoading , error} = useGetUserQuery()
  if(isLoading) return <div>Loading...</div>;
  if(error) console.log(error);
  console.log(data)
  if(!data?.success){
    return <Navigate to="/login" />
  }
  return (
    <>
    <Outlet/>
    </>
  )
}

export default DashboardLayout