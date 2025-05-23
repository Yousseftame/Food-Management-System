import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../sidebar/sideBar'
import Navbar from '../navbar/navbar'
export default function masterLayout({loginData, setLoginData}) {
  return (
    <>
    <div className="d-flex">
      <div className=" ">

      <SideBar loginData={loginData} setLoginData={setLoginData} />

      </div>
      <div className="w-100   ">
      <Navbar loginData={loginData}/>
      <Outlet/>

      </div>

    </div>
       
      

    </>
  )
}
