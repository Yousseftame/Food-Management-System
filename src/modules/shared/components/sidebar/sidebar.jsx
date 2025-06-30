import React, { useContext, useState } from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom';
import sideLogo from '../../../../assets/images/3.png'
import changePassword from '../../../Authentication/components/change-pass/changePassword';
import { AuthContext } from '../../../../context/AuthContext';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DeleteConfirmation from '../deleteConfirmation/deleteConfirmation';
import noDataImg from '../../../../assets/images/nodataimg.png'




export default function sideBar() {

  let {loginData,setLoginData} = useContext(AuthContext);
  const [isCollapsed, setIsCollapsed]= useState(false);
  
   // model bootstrap lists logout
   const [show, setShow] = useState(false);
   const handleClose = () => setShow(false);
   const handleShow = () => {
     setShow(true);
   }

  let toggleCollapse = () =>{
    setIsCollapsed(!isCollapsed)
  }

    const navigate =useNavigate();
   // log out function 
   let logOut = () =>{
    localStorage.removeItem('token');
    setLoginData(null);
    navigate("/login");

  }


  return (
    <>
     <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton >
         
        </Modal.Header>
        <Modal.Body>  

        <div className="  text-center ">
      <img src={noDataImg} alt="delete-img" />
      <h5 className=' pt-3 '>Are You Sure? </h5>
      <p className='text-muted'>are you sure you want to To Log Out ? if you are sure just click on LogOut it</p>


    </div>
    




        </Modal.Body>
        <Modal.Footer>
          <Button variant="btn btn-outline-danger" onClick={logOut}>
            Log out 
          </Button>
          
        </Modal.Footer>
      </Modal>
    <div className="sideContainer">
     <Sidebar collapsed={isCollapsed}>
  <Menu>
    <MenuItem onClick={toggleCollapse} className='my-5  sidebarLogo'> <img src={sideLogo} alt="logo"  /></MenuItem>
    
    <MenuItem icon={<i class="fa-solid fa-house    "></i>} component={<Link to="/dashboard" />}> Home </MenuItem>
   {loginData?.userGroup != "SystemUser" ? <MenuItem icon={<i class="fa-solid fa-users"></i>} component={<Link to="/dashboard/users" />}> Users </MenuItem> : ""  } 
    <MenuItem icon={<i class="fa-solid fa-table-cells"></i>} component={<Link to="/dashboard/recipes" />}> Recipes </MenuItem>
    {loginData?.userGroup != "SuperAdmin" ? <MenuItem icon={<i class="fa-regular fa-heart"></i>} component={<Link to="/dashboard/favs" />}> Favorite </MenuItem> : ""  } 
    {loginData?.userGroup != "SystemUser" ? <MenuItem icon={<i class="fa-solid fa-table-cells-row-lock"></i>} component={<Link to="/dashboard/categories" />}> Categories </MenuItem> : ""}
    {loginData?.userGroup != "SystemUser" ? <MenuItem icon={<i class="fa-solid fa-unlock-keyhole"></i>} component={<Link to="/change-password" />}> Change Password </MenuItem> : ""}
    <MenuItem  onClick={handleShow} icon={<i class="fa-solid fa-right-from-bracket"></i>} > Log out </MenuItem>
  </Menu>
</Sidebar>;


</div>
    </>
  )
}
