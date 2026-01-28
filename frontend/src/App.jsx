import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './pages/Home'
import Layout from './components/Layout'
import Login from './pages/Login'
import Registration from './pages/Registration'
import BlogDetails from './pages/BlogDetails'
import Dashboard from './pages/Dashboard'
import DashboardLayout from './components/Layout/DashboardLayout'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<Home/>} />
        <Route path='blog/:slug' element={<BlogDetails/>}/>
      </Route>
      <Route path='/dashboard' element={<DashboardLayout/>}>
        <Route index element={<Dashboard/>}/>
      </Route>
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Registration/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App