import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../sidebar/sidebar'
import Navbar from '../navbar/navbar'
import Header from '../header/header'
export default function masterLayout() {
  return (
    <>
    <div className="d-flex">
      <div className="w-25 bg-info">

      <Sidebar/>

      </div>
      <div className="w-75 bg-danger">
      <Navbar/>
      <Header/>  
      <Outlet/>

      </div>

    </div>
       
      

    </>
  )
}
