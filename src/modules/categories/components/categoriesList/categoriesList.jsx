import React, { useContext, useEffect, useState } from 'react'
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
import { axiosInstance, baseURLs, CATEGORY_URLS } from '../../../../services/urls';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../../context/AuthContext';



export default function categoriesList() {
      
  let {loginData} = useContext(AuthContext);
 const  params = useParams();
const [category, setCategory] = useState("");

      const [arrayOfPages,setArrayOfPages]= useState([]);   //pageination
      let {register,formState:{errors} ,handleSubmit,reset}= useForm();
      const [catId, setCatId] = useState(null);
      const [categoriesList, setCategoriesList]= useState([]);
      const [viewList, setViewList]= useState([]);
      const [nameValue,setNameValue]= useState("")  //search 
      const navigate = useNavigate();


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



 // search function 
  const  getNameValue=(input)=>{
    setNameValue(input.target.value);
    getAllCategories(5,1,input.target.value)

    
  }

  // list function + search
  let getAllCategories = async(pageSize,pageNumber,name) =>{
    try {
      // let response = await axios.get(`https://upskilling-egypt.com:3006/api/v1/Category/?${pageSize}=&${pageNumber}=`,
      //   {
      //     headers:{
      //       Authorization :localStorage.getItem('token')
      //     }});

          let response = await axios.get(`${baseURLs}/api/v1/Category/`, {
         headers:{
            Authorization :localStorage.getItem('token')
          },
        params: {
          pageSize,
          pageNumber,
          name,
        },
         });



          
                // let response = await axiosInstance.get(`${CATEGORY_URLS.GET_CATEGORY}`,
                //   {params:{pageSize,pageNumber,name}});

                setArrayOfPages(Array(response.data.totalNumberOfPages).fill().map((_,i)=>i+1)); //pagination
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
          reset();
          
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
          reset();
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
          // let respone = await axiosInstance.delete(CATEGORY_URLS.DELETE_CATEGORY(catId))

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
    if (loginData?.userGroup != 'SuperAdmin') {

      navigate("/Login");      


      
    }
    getAllCategories(5,1,"");
   

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
        <h4 className='viewHead'>   Category Details </h4>
        </Modal.Header>
        <Modal.Body   > 
          <div>
           <h5> <span className='viewText'> ⭕ Category name : </span>  <span className='viewAnswer text-muted'> {viewList.name}  </span></h5>
           <h5> <span className='viewText'> ⭕ Creation Date : </span>   <span className='viewAnswer text-muted'>  {viewList.creationDate}  </span>         </h5>
           <h5> <span className='viewText'> ⭕ Modification Date :</span> <span className='viewAnswer text-muted' >   {viewList.modificationDate}  </span>         </h5>
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
        <h3 className='headCatgory'>Category Table Details</h3>
        <p className='categoryParagaph'>You can check all details</p>
        </div>

        <button onClick={handleShowAdd} className='btn btn-success btnStyle me-5'>Add New Category</button>
      </div>

            

      <div className="p-4">
        {/* search input */}
        <div class="input-group pb-4">
  <span class="input-group-text" id="visible-addon">  <i className="bi bi-search  "></i></span>
  <input type="text" class="form-control" placeholder="Search Here by Name" aria-label="Username" aria-describedby="visible-addon" onChange={getNameValue}/>
  <input type="text" class="form-control d-none" placeholder="Hidden input" aria-label="Hidden input" aria-describedby="visible-addon"  />
</div>
      <table className=' table table-striped-columns text-center shadow-lg    '>
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
<div className="dropdown">
  <button className="btn   " type="button" data-bs-toggle="dropdown" aria-expanded="false">
<i className="bi bi-three-dots"></i>  
</button>
  <ul className="dropdown-menu">
    
            <tr>
        <li><a   onClick={()=>handleShowView(item.id)} className="dropdown-item"  ><i className="bi bi-eye  text-success"></i> View</a></li>
        <li><a  onClick={()=>handleShowUpdate(item.id)} className="dropdown-item" ><i className="bi bi-pencil text-success"></i> Edit</a></li>
        <li><a  onClick={()=>handleShow(item.id)} className="dropdown-item text-danger"><i  className="bi bi-trash "></i> Delete</a></li>
         </tr>
  </ul>
</div>
</td>
          </tr> ) : <NoData/>}


          
          
        </tbody>




      </table>
      
 
 {/* pagination */}
 {categoriesList.length >0 ?
<nav aria-label="...">
  <ul class="pagination pagination-md d-flex justify-content-center pt-3">
    
    {arrayOfPages.map(pageNo=>
          <li onClick={()=> getAllCategories(5,pageNo)} class="page-item"><a class="page-link">{pageNo}</a></li>

    )}
  </ul>
</nav> : ""}

      </div>
           



           


    </>
  )
}
