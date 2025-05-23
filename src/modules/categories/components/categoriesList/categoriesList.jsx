import React, { useEffect, useState } from 'react'
import Header from '../../../shared/components/header/header'
import recipePic  from '../../../../assets/images/Group 48102127.png'
import axios from 'axios';
import header from '../../../shared/components/header/header';
import NoData from '../../../shared/components/noData/noData';
import DeleteConfirmation from '../../../shared/components/deleteConfirmation/deleteConfirmation';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import { Bounce, toast } from 'react-toastify';



export default function categoriesList() {
      
const [category, setCategory] = useState("");


      let {register,formState:{errors} ,handleSubmit,}= useForm();
      const [catId, setCatId] = useState(null);
      const [categoriesList, setCategoriesList]= useState([]);
      const [viewList, setViewList]= useState([]);

      //toastify
      const resolveAfter3Sec = new Promise(resolve => setTimeout(resolve, 3000));


      


  // model bootstrap lists delete
   const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setCatId(id)
    setShow(true);
  }

  // model bootstrap lists update
   const [showUpdate, setShowUpdate] = useState(false);
  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = (id) => {
    setCatId(id)
    setShowUpdate(true);
  }



  // model bootstrap lists Add
   const [showAdd, setShowAdd] = useState(false);
  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => {
    setShowAdd(true);
  }

  // model bootstrap lists show
  const [showView, setShowView] = useState(false);
  const handleCloseView = () => setShowView(false);
  const handleShowView = (id) => {
    setCatId(id)
    setShowView(true);
  }




  // list function
  let getAllCategories = async() =>{
    try {
      let response = await axios.get('https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=5&pageNumber=1',
        {
          headers:{
            Authorization :localStorage.getItem('token')
          }});
          console.log(response);
          
    setCategoriesList(response.data.data);
      
    } catch (error) {
      console.log(error);
    }}

    // add function 
    let addCategories =async (data) =>{
      try {
        let resposne = await axios.post('https://upskilling-egypt.com:3006/api/v1/Category/', data,{
          headers:{
            Authorization :localStorage.getItem('token')
          }}); 
          // console.log(resposne);
          getAllCategories();
          
          handleCloseAdd();
          
          toast.promise(
    resolveAfter3Sec,
    {
      pending: 'Promise is pending',
      success: 'Item Added! 👌',
      
    })
        
          
      } catch (error) {
       
        console.log(error);
        
      }
    }
    // update function
    let updateCategories =async (data)=>{
      let response = await axios.put(`https://upskilling-egypt.com:3006/api/v1/Category/${catId}`,data,
        {
          headers:{
            Authorization :localStorage.getItem('token')
          }});
          // console.log(response);
          getAllCategories();
          handleCloseUpdate();
          toast.promise(
    resolveAfter3Sec,
    {
      pending: 'Promise is pending',
      success: 'Item Updated! 👌',
      
    })

      


    }





    // delete function
    let deleteCategories = async () =>{
      try {
        let response = await axios.delete(`https://upskilling-egypt.com:3006/api/v1/Category/${catId}`,{
          headers:{
            Authorization :localStorage.getItem('token')
          }});
          // console.log(response);
          getAllCategories();           // refresh comp to show new list after delete
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

    // view function
    let viewCategories = async ()=>{

      try {
        let response = await axios.get(`https://upskilling-egypt.com:3006/api/v1/Category/${catId}`,{
          headers:{
            Authorization :localStorage.getItem('token')
          }}); 
          //  console.log(response.data);
           setViewList(response.data)
          

        
      } catch (error) {
        console.log(error);
        
        
      }
      
    }


  useEffect ( ()=>{
    getAllCategories();
   

  },[])

  



  return (
    <>
    <Header title={"Categories "} title2={'Item'} description={"You can now add your items that any user can order it from the Application and you can edit"} imgPath={recipePic}/>


     
        {/* delete model list  */}
      <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton >
         
        </Modal.Header>
        <Modal.Body>  <DeleteConfirmation deleteItem={'Category'}/> </Modal.Body>
        <Modal.Footer>
          <Button variant="btn btn-outline-danger" onClick={deleteCategories}>
            Delete this item
          </Button>
          
        </Modal.Footer>
      </Modal>

          {/* Add model list */}
       <Modal show={showAdd} onHide={handleCloseAdd} onExited={() => setCategory("")}>
        <Modal.Header closeButton >
         Add Category
        </Modal.Header>
        <Modal.Body> 
          <form onSubmit={handleSubmit(addCategories)}>
             <div className="input-group flex-nowrap">
              <input {...register('name',{
                required:'Category Name is required',
              })} type="text" className="form-control" placeholder="Category Name" aria-label="Username" aria-describedby="addon-wrapping"/>
              </div>
              {errors.name&&<span className='text-danger   '>{errors.name.message}   </span>}
              <button   className='auth-button btn btn-success float-end  my-4'>Save </button>

          </form>
         
            </Modal.Body>
      </Modal>


              {/* update model list  */}
           <Modal show={showUpdate} onHide={handleCloseUpdate}  onExited={() => setCategory("")}>
        <Modal.Header closeButton >
         Update Category
        </Modal.Header>
        <Modal.Body> 
          <form onSubmit={handleSubmit(updateCategories)}>
             <div className="input-group flex-nowrap">
              <input {...register('name',{
                required:'Category Updated Name is required',
              })} type="text" className="form-control" placeholder=" Update  Name" aria-label="Username" aria-describedby="addon-wrapping"/>
              </div>
              {errors.name&&<span className='text-danger   '>{errors.name.message}   </span>}
              <button   className='auth-button btn btn-success float-end  my-4'>Update </button>

          </form>
         
            </Modal.Body>
      </Modal>    


            {/* View model list  */}
          <Modal show={showView} onHide={handleCloseView}>
        <Modal.Header closeButton >
          Category Details
        </Modal.Header>
        <Modal.Body   > 
          <div>
           <h6>  Category name :  {viewList.name} </h6>
           <h6>  Creation Date  :   {viewList.creationDate}           </h6>
           <h6>  Modification Date  :   {viewList.modificationDate}           </h6>
          </div>
          
            </Modal.Body>
             <Modal.Footer>
          <Button variant="btn btn-outline-success" onClick={viewCategories}>
            View Category
          </Button>
          
        </Modal.Footer>
             
            
            
      </Modal>
   



      <div className="d-flex justify-content-between align-items-center   p-4">

        <div>
        <h3 className='headCatgory'>Recipe Table Details</h3>
        <p className='categoryParagaph'>You can check all details</p>
        </div>

        <button onClick={handleShowAdd} className='btn btn-success btnStyle me-5'>Add New Category</button>
      </div>

      <div className="p-4">
      <table className=' table table-striped text-center'>
        <thead>
          <th>Name</th>
          <th>Creation Date</th>
          <th>Modification Date</th>
          <th>Actions</th>
          
        </thead>
        <tbody>
          {categoriesList.length >0 ?categoriesList.map((item)=>
            <tr>
            <td>{item.name}</td>
            <td>{item.creationDate}</td>
            <td>{item.modificationDate}</td>
            <td>
<div class="dropdown">
  <button class="btn   " type="button" data-bs-toggle="dropdown" aria-expanded="false">
<i class="bi bi-three-dots"></i>  
</button>
  <ul class="dropdown-menu">
    
            <tr>
        <li><a   onClick={()=>handleShowView(item.id)} class="dropdown-item" href="#"><i class="bi bi-eye  text-success"></i> View</a></li>
        <li><a  onClick={()=>handleShowUpdate(item.id)} class="dropdown-item" href="#"><i class="bi bi-pencil text-success"></i> Edit</a></li>
        <li><a  onClick={()=>handleShow(item.id)} class="dropdown-item text-danger" href="#"><i  class="bi bi-trash "></i> Delete</a></li>
         </tr>
  </ul>
</div>
</td>
          </tr> ) : <NoData/>}


          
          
        </tbody>


      </table>
      </div>
           



           
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"/>
<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet"/>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

    </>
  )
}
