import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../sidebar/sideBar'
import Navbar from '../navbar/navbar'
import { AuthContext } from '../../../../context/AuthContext'
export default function masterLayout() {
  let {loginData,setLoginData} =useContext(AuthContext);
  return (
    <>
    <div className="d-flex w-100">

      <SideBar  />

      <div className="w-100   ">
      <Navbar />
      <Outlet/>

      </div>

    </div>
       
      

    </>
  )
}
