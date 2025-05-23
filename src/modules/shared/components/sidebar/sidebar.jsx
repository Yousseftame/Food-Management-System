import React, { useState } from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom';
import sideLogo from '../../../../assets/images/3.png'



export default function sideBar({loginData,setLoginData}) {
  const [isCollapsed, setIsCollapsed]= useState(false);

  let toggleCollapse = () =>{
    setIsCollapsed(!isCollapsed)
  }

    const navigate =useNavigate();
   // log out function 
   let logOut = () =>{
    localStorage.removeItem('token');
    setLoginData(null)
    navigate("/login");

  }


  return (
    <>
    <div className="sideContainer">
     <Sidebar collapsed={isCollapsed}>
  <Menu>
    <MenuItem onClick={toggleCollapse} className='my-5  sidebarLogo'> <img src={sideLogo} alt="logo"  /></MenuItem>
    
    <MenuItem icon={<i class="fa-solid fa-house    "></i>} component={<Link to="/dashboard" />}> Home </MenuItem>
    <MenuItem icon={<i class="fa-solid fa-users"></i>} component={<Link to="/dashboard/users" />}> Users </MenuItem>
    <MenuItem icon={<i class="fa-solid fa-table-cells"></i>} component={<Link to="/dashboard/recipes" />}> Recipes </MenuItem>
    <MenuItem icon={<i class="fa-solid fa-table-cells-row-lock"></i>} component={<Link to="/dashboard/categories" />}> Categories </MenuItem>
    <MenuItem icon={<i class="fa-solid fa-unlock-keyhole"></i>} component={<Link to="/forget-pass" />}> Change Password </MenuItem>
    <MenuItem  onClick={logOut} icon={<i class="fa-solid fa-right-from-bracket"></i>} > Log out </MenuItem>
  </Menu>
</Sidebar>;


</div>
    </>
  )
}
