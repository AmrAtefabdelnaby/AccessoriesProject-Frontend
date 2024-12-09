import React from 'react'
import Navbar from '../navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../footer/Footer'
import { Toaster } from 'react-hot-toast'

export default function Layout() {
  return (
    <div>
      <Toaster position='top-right'/>
        <Navbar />
        <Outlet />
        <Footer/>
      
    </div>
  )
}
