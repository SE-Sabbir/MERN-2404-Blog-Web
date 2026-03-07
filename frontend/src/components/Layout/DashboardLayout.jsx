import React from 'react'
import { Navigate, Outlet } from 'react-router'
import { useGetUserProfileQuery } from '../../service/api'
import PageLoader from '../ui/PageLoader'

const DashboardLayout = () => {
  const {data , isLoading , error} = useGetUserProfileQuery()
  if(isLoading) return <PageLoader/>
  if(error) console.log(error);
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