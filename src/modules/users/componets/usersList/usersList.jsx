import React, { useEffect, useState } from 'react'
import Header from '../../../shared/components/header/header'
import recipePic  from '../../../../assets/images/Group 48102127.png'
import NoData from '../../../shared/components/noData/noData';
import DeleteConfirmation from '../../../shared/components/deleteConfirmation/deleteConfirmation';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Bounce, toast } from 'react-toastify';
import axios from 'axios';
import { baseURLs } from '../../../../services/urls';
import { useParams } from 'react-router-dom';


export default function usersList() {


  //toastify
  const resolveAfter3Sec = new Promise(resolve => setTimeout(resolve, 3000));

  let [userView, setUserView] = useState([]);
  let [userList, setUserList] = useState([]);
  const params = useParams();
  const [nameValue,setNameValue]= useState("")  //search 
    const [groupValue,setGroupValue]= useState("")  //search 

   const [arrayOfPages,setArrayOfPages]= useState([]);   //pageination
  
  
       const [userId, setUserId] = useState(null);
 
     // model bootstrap lists delete
      const [show, setShow] = useState(false);
     const handleClose = () => setShow(false);
     const handleShow = (id) => {
       setUserId(id)
       setShow(true);
     }
     
      // model bootstrap lists show
       const [showView, setShowView] = useState(false);
       const handleCloseView = () => setShowView(false);
       const handleShowView = (id) => {
         setUserId(id)
         setShowView(true);
       }



   // search by group
  const getGroupValue=(input)=>{
      setGroupValue(input.target.value);
      getUserList(7,1,nameValue,input.target.value)  // to make search with both in the same time not ONE BY ONE 
  }

   // search by name function 
  const  getNameValue=(input)=>{
    setNameValue(input.target.value);
    getUserList(7,1,input.target.value,groupValue)

    
  }

  // list and search
  let getUserList = async (pageSize,pageNumber,userName,groups)=>{
    try {
      let response =  await axios.get(`${baseURLs}/api/v1/Users/`,{
        headers:{
             Authorization :localStorage.getItem('token')
           },
           params:{
            pageSize,
            pageNumber,
            userName,
            groups,
           },

          }
      )
       console.log(response.data.data);
      setUserList(response.data.data);
     setArrayOfPages(Array(response.data.totalNumberOfPages).fill().map((_,i)=>i+1)); //pagination


      

      
    } catch (error) {
      console.log(error);
      
      
    }
  }

  // delete user
  let deleteUser = async () =>{
    try {
      let response = await axios.delete(`https://upskilling-egypt.com:3006/api/v1/Users/${userId}`,{
        headers:{
             Authorization :localStorage.getItem('token')
           }})
           console.log(response);
           getUserList();           // refresh comp to show new list after delete
           handleClose();                // then close the model
           toast.promise(
               resolveAfter3Sec,
               {
                 pending: 'Promise is pending',
                 success: 'successfully deleted!! 👌',
                 
               })
           
      
    } catch (error) {
      console.log(error);
      
      
    }

  }

  // view list 
  let viewUser =  async()=>{
    try {
      let response = await axios.get(`https://upskilling-egypt.com:3006/api/v1/Users/${userId}`,{
        headers:{
             Authorization :localStorage.getItem('token')
           }})
           console.log(response.data);
           
           setUserView(response.data);



           
           
      
    } catch (error) {
      console.log(error);
      
      
    }
  }












  useEffect ( ()=>{
    getUserList(7,1,"");
     
     
  
    },[])






  return (
    <>
    <Header title={"Users List"} description={"You can now add your items that any user can order it from the Application and you can edit"} imgPath={recipePic}/>

     {/* delete model list  */}
      <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton >
         
        </Modal.Header>
        <Modal.Body>  <DeleteConfirmation deleteItem={'User '}/> </Modal.Body>
        <Modal.Footer>
          <Button variant="btn btn-outline-danger" onClick={deleteUser}>
            Delete this User
          </Button>
          
        </Modal.Footer>
      </Modal>

         {/* View model list  */}
          <Modal show={showView} onHide={handleCloseView}>
        <Modal.Header closeButton >
        <h4 className='viewHead'>  User Details </h4>
        </Modal.Header>
        <Modal.Body   > 
          <div>
           <h5> <span className='viewText'> ⭕ User Name :  </span>  <span className='viewAnswer text-muted'> {userView.userName}</span> </h5>
           <h5> <span className='viewText'> ⭕ Email  :   </span>  <span className='viewAnswer text-muted'> {userView.email}  </span>         </h5>
           <h5><span className='viewText'> ⭕ phoneNumber  :  </span>  <span className='viewAnswer text-muted'>  {userView.phoneNumber}  </span>         </h5>
           <h5><span className='viewText'> ⭕ Country :  </span>  <span className='viewAnswer text-muted'>  {userView.country}  </span>         </h5>
           <h5><span className='viewText'> ⭕ Role :  </span>  <span className='viewAnswer text-muted'> {userView?.group?.name}  </span>         </h5>
           <h5> <span className='viewText'> ⭕ Creation Date  :  </span>  <span className='viewAnswer text-muted'> {userView.creationDate}   </span>        </h5>
           <h5> <span className='viewText'> ⭕ Modification Date  :  </span>  <span className='viewAnswer text-muted'>  {userView.modificationDate} </span>          </h5>
          </div>
          
            </Modal.Body>
             <Modal.Footer>
          <Button variant="btn btn-outline-success" onClick={viewUser}>
            View User
          </Button>
          
        </Modal.Footer>
             
            
            
      </Modal>
   


    <div className="d-flex justify-content-between align-items-center   p-4">

        <div>
        <h3 className='headCatgory'>Users Table Details</h3>
        <p className='categoryParagaph'>You can check all details</p>
        </div>

      </div>


       <div className="p-4">
              
              <div className="row align-items-center  ">
          <div className="col-md-6">
             {/* search input */}
        <div class="input-group  ">
  <span class="input-group-text" id="visible-addon">  <i className="bi bi-search  "></i></span>
  <input type="text" class="form-control " placeholder="Search Here by Name" aria-label="Username" aria-describedby="visible-addon" onChange={getNameValue} />
  <input type="text" class="form-control d-none " placeholder="Hidden input" aria-label="Hidden input" aria-describedby="visible-addon"  />
</div>

          </div>
          <div className="col-md-3  ">
            <select className=' form-control my-3' onChange={getGroupValue} >  
                   <option value={""}>Search by role</option>
                  <option value={1}>Admin</option>
                  <option value={2}>System User</option>
                
              </select>  
          </div>
         
        </div>

            <table className=' table  table-striped-columns text-center '>
              <thead>
                <th>User Name</th>
                <th>Email</th>
                <th>phoneNumber</th>
                <th>Country</th>
                <th>Role</th>
                <th>Creation Date</th>
                <th>Modification Date</th>
                <th>Actions</th>
                
              </thead>
                {userList.length >0 ?userList.map((user)=>
              <tbody>
                  <tr>
                  <td>{user.userName}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.country}</td>
                  <td className='text-success' >{user.group.name}</td>
                  <td>{user.creationDate}</td>
                  <td>{user.modificationDate}</td>
                  <td>
      <div className="dropdown">
        <button className="btn   " type="button" data-bs-toggle="dropdown" aria-expanded="false">
      <i className="bi bi-three-dots"></i>  
      </button>
        <ul className="dropdown-menu">
          
                  <tr>
              <li><a onClick={()=>handleShowView(user.id)}  className="dropdown-item"  ><i className="bi bi-eye  text-success"></i> View</a></li>
              <li><a onClick={()=>handleShow(user.id)} className="dropdown-item text-danger"><i  className="bi bi-trash "></i> Delete</a></li>
               </tr>
        </ul>
      </div>
      </td>
                </tr>  
      
      
                
                
              </tbody> ) : < NoData /> }
      
      
      
      
            </table>
            
       
       {/* pagination */}
       {/* {userList.length >0 ?
      <nav aria-label="...">
        <ul class="pagination pagination-md d-flex justify-content-center pt-3">
          
          {arrayOfPages.map(pageNo=>
                <li onClick={()=> getUserList(7,pageNo)} class="page-item"><a class="page-link">{pageNo }</a></li>
      
          )}
        </ul>
      </nav> : ""} */}
      
            </div>
                 































    </>
  )
}
