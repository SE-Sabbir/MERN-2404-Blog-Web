import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './pages/Home'
import Layout from './components/Layout'
import Login from './pages/Login'
import Registration from './pages/Registration'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<Home/>} />
      </Route>
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Registration/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App