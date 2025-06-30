import React, { useContext, useEffect, useState } from 'react'
import Header from '../../../shared/components/header/header'
import recipePic  from '../../../../assets/images/Group 48102127.png'
import { axiosInstance, baseImgURLs, baseURLs, RECIPE_URLS } from '../../../../services/urls';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import NoData from '../../../shared/components/noData/noData';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DeleteConfirmation from '../../../shared/components/deleteConfirmation/deleteConfirmation';
import { Bounce, toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../../context/AuthContext';






export default function recipeList() {

  const params = useParams()

  let {loginData} = useContext(AuthContext);
  const [nameValue,setNameValue]= useState("")  //search by name
    const [tagValue,setTagValue]= useState("")  //search by tag
  const [catValue,setCatValue]= useState("")  //search by cate

  const [arrayOfPages,setArrayOfPages]= useState([]); //pagineation
  const [viewList, setViewList]= useState([]);
  const [category, setCategory] = useState("");
  const [recicpeId, setRecipeId] = useState(null);


    const resolveAfter3Sec = new Promise(resolve => setTimeout(resolve, 3000));



     // model bootstrap lists update
       const [showUpdate, setShowUpdate] = useState(false);
      const handleCloseUpdate = () => setShowUpdate(false);
      const handleShowUpdate = (id) => {
        setRecipeId(id);
        setShowUpdate(true);
      }
       // update function using
        const [categoriesList, setCategoriesList]= useState([]);
        let [tagList,setTagList] =useState([]);
        let {register,formState:{errors},handleSubmit,reset}= useForm();

    const appendToFormData =(data)=>{             // convert from data to form data then send it to the back end ( because this form inculde file upload data)
    const formData = new FormData();
    formData.append("name",data.name);
    formData.append("price",data.price);
    formData.append("tagId",data.tagId);
    formData.append("categoriesIds",data.categoriesIds);
    formData.append("description",data.description)
    formData.append("recipeImage",data.recipeImage[0]);
    return formData
   }


  // model bootstrap lists show
    const [showView, setShowView] = useState(false);
    const handleCloseView = () => setShowView(false);
    const handleShowView = (id) => {
      setRecipeId(id)
      setShowView(true);
    }

   // model bootstrap lists delete
     const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (id) => {
      setRecipeId(id)
      setShow(true);
    }

    const navigate = useNavigate();
  const [recipeList, setRecipeList] = useState([]);

 //model bootstrap favs add
  //  const [showFav, setShowFav] = useState(false);
  //  const handleCloseFav = () => setShowFav(false);
  //  const handleShowFav = (id) => {
  //   setRecipeId(id);
    
  //    setShowFav(true);
  //  }


  //list recipes + search func
  let getAllRecipes = async(pageSize,pageNumber,name,tagId,categoryId)=>{
    try {
      // let response = await axiosInstance.get(`${RECIPE_URLS.GET_RECIPE}`,{params:{pageSize:2,pageNumber:1}});
      let response = await axios.get(`${baseURLs}/api/v1/Recipe/`, {
         headers:{
            Authorization :localStorage.getItem('token')
          },
        params: {
          pageSize,
          pageNumber,
           name,
           tagId,
           categoryId,
        },
         });

       setArrayOfPages(Array(response.data.totalNumberOfPages).fill().map((_,i)=>i+1)); //pagination
      console.log(response.data.data);
      setRecipeList(response.data.data);  
      
      
    } catch (error) {
      console.log(error);
      
      
    }

  }

   // search by name
    const getNameValue=(input)=>{
      setNameValue(input.target.value);
      getAllRecipes(5,1,input.target.value,tagValue,catValue)
      
    }
    // search by tag
    const getTagValue=(input)=>{
      setTagValue(input.target.value);
      getAllRecipes(5,1,nameValue,input.target.value,catValue)
      
    }
    // search by cate
    const getCateValue=(input)=>{
      setCatValue(input.target.value);
      getAllRecipes(5,1,nameValue,tagValue,input.target.value)
      
    }


  // update recipes 
  let getAllTags = async()=>{
      try {
        let response = await axios.get(`https://upskilling-egypt.com:3006/api/v1/tag/`,{
          headers:{
            Authorization :localStorage.getItem('token')
          }}); 
          // console.log(response.data);
          setTagList(response.data);
          

          
        
      } catch (error) {
        console.log(error);
        
  
      }
      
    }

  
    let getAllCategories = async() =>{
    try {
      let response = await axios.get('https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=5&pageNumber=1',
        {
          headers:{
            Authorization :localStorage.getItem('token')
          }});
     console.log(response.data);  
    setCategoriesList(response.data.data);
      
    } catch (error) {
      console.log(error);
    }}

  let updateRecipes = async(data)=>{
      let recipeData = appendToFormData(data);
    try {
        let response = await axios.put(`https://upskilling-egypt.com:3006/api/v1/Recipe/${recicpeId}`,recipeData,{
          headers:{
            Authorization :localStorage.getItem('token')
          }}); 
          console.log(response);
          getAllRecipes();
          reset();
          handleCloseUpdate();
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





  // delete recipes 
  let deleteRecipes =async ()=>{
     try {
        let response = await axios.delete(`https://upskilling-egypt.com:3006/api/v1/Recipe/${recicpeId}`,{
          headers:{
            Authorization :localStorage.getItem('token')
          }});
          console.log(response);
          
          getAllRecipes();
          handleClose();              
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
  // view recipe 
  
  let viewRecipes =async()=>{
    try {
      let response = await axios.get(`https://upskilling-egypt.com:3006/api/v1/Recipe/${recicpeId}`,{
          headers:{
            Authorization :localStorage.getItem('token')
          }});
          console.log(response);
          
          setViewList(response.data)
      
    } catch (error) {
      console.log(error);
      
      
    }
  }

  // add recipe to favs 
  let addToFavs= async (recipeId)=>{
    try {
      // let response = await axios.post(`${baseURLs}/api/v1/userRecipe/${recipeId}`,data, {
      //   headers:{
      //      Authorization :localStorage.getItem('token')
      //    },
      //   });
      let response = await axios.post(`https://upskilling-egypt.com:3006/api/v1/userRecipe/`,{recipeId},{

        headers:{   
          Authorization :localStorage.getItem('token')
        }});
        console.log(response);
        navigate('/dashboard/favs');
        toast.promise(
          resolveAfter3Sec,
          {
            pending: 'Promise is pending',
            success: 'successfully Added!! 👌',
            
          })

        


    } catch (error) {
      console.log(error);
      
      
    }
  }
 

 

  





  useEffect ( ()=>{
    getAllRecipes(5,1);
     getAllTags();
      getAllCategories();

  },[])











  return (
    <>
    <Header title={"Recipes "} title2={"Items"} description={"You can now add your items that any user can order it from the Application and you can edit"} imgPath={recipePic}/>


      {/* delete model list  */}
      <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton >
         
        </Modal.Header>
        <Modal.Body>  <DeleteConfirmation deleteItem={'Recipe'}/> </Modal.Body>
        <Modal.Footer>
          <Button variant="btn btn-outline-danger" onClick={deleteRecipes}>
            Delete this item
          </Button>
          
        </Modal.Footer>
      </Modal>

       {/* add model fav  */}
       {/* <Modal show={showFav} onHide={handleCloseFav} >
        <Modal.Header closeButton >
         
        </Modal.Header>
        <Modal.Body>  <DeleteConfirmation deleteItem={'Fav'}/> </Modal.Body>
        <Modal.Footer>
          <Button variant="btn btn-outline-success" onClick={addToFavs}>
            Add this item
          </Button>
          
        </Modal.Footer>
      </Modal> */}

        {/* View model list  */}
          <Modal show={showView} onHide={handleCloseView}>
        <Modal.Header closeButton >
         <h4 className='viewHead'>   Recipe Details </h4>        </Modal.Header>
        <Modal.Body   > 
          <div>
            <div className=' d-flex justify-content-center  '>

              <img className='w-50 rounded-3  ' src={`${baseImgURLs}${viewList.imagePath}`} alt="" />          
            </div>
            <div className=' text-center  '>

           <h5> <span className='viewText'> ⭕ Item Name :  </span>  <span className='viewAnswer text-muted'> {viewList.name} </span> </h5>
           <h5>  <span className='viewTex '>⭕ Price : </span>  <span className='viewAnswer text-muted'> {viewList.price}   </span>        </h5>
           <h5> <span className='viewText'> ⭕ Description  : </span>  <span className='viewAnswer text-muted'> {viewList.description}  </span>         </h5>
           <h5> <span className='viewText'> ⭕ Tag  : </span>  <span className='viewAnswer text-muted'> {viewList?.tag?.name}  </span>         </h5>
           {/* <h5>  Category  :   {viewList?.category[0]?.name}           </h5> */}
            </div>
          </div>
          
            </Modal.Body>
             <Modal.Footer>
          <Button variant="btn btn-outline-success" onClick={viewRecipes}>
            View Recipe
          </Button>
          
        </Modal.Footer>
             
            
            
      </Modal>


      {/* update model list  */}
           <Modal show={showUpdate} onHide={handleCloseUpdate}  onExited={() => setCategory("")}>
        <Modal.Header closeButton >
         Update Recipes
        </Modal.Header>
        <Modal.Body> 
          
        <form  onSubmit={handleSubmit(updateRecipes)}>
          <div className="input-group my-3 flex-nowrap">
              <input {...register('name',{
                required:"Name is Required",
              })} type="text" className="form-control" placeholder="Recipe Name" aria-label="Username" aria-describedby="addon-wrapping"/>
              </div>
              {errors.name&&<span className='text-danger'>{errors.name.message}   </span>}

              <select className=' form-control my-3'  {...register('tagId',{
                required:"tag  is Required",
              })}> 
                {tagList.map(item=>
                  <option value={item.id}>{item.name}</option>
                )}
              </select>
              {errors.tagId&&<span className='text-danger'>{errors.tagId.message}   </span>} 



          <div className="input-group    my-3 flex-nowrap">
              <input {...register('price',{
                required:"Price is Required",
              })} type="number" className="form-control" placeholder="Price" aria-label="Username" aria-describedby="addon-wrapping"/>
              </div>
              {errors.price&&<span className='text-danger'>{errors.price.message}   </span>} 


           <select className=' form-control my-3'  {...register('categoriesIds',{
                required:"categories  is Required",
              })}> 
                {categoriesList.map(item=>
                  <option value={item.id}>{item.name}</option>
                )}
              </select>  
            {errors.categoriesIds&&<span className='text-danger'>{errors.categoriesIds.message}   </span>} 
  


           <div className="input-group my-3 flex-nowrap">
              <textarea {...register('description',{
                required:"description  is Required",
              })} type="text" className="form-control" placeholder="Description  " aria-label="Username" aria-describedby="addon-wrapping"/>
              </div>
              {errors.description  &&<span className='text-danger'>{errors.description.message}   </span>}    



           <div className="input-group    my-3 flex-nowrap">
              <input {...register('recipeImage',{
                required:"recipeImage is Required",
              })} type="file" className="form-control  custom-file-dropzone border border-success rounded p-4 text-center dragCustom" placeholder="drag and drop" aria-label="Username" aria-describedby="addon-wrapping"/>
              </div>
              {errors.recipeImage&&<span className='text-danger'>{errors.recipeImage.message}   </span>} 

            <div className=' d-flex justify-content-end mt-5'>

            <button type='button' onClick={handleCloseUpdate} className='btn btn-outline-success w-25 me-2  '>Cancel</button>
            <button  className='btn btn-success w-25 me-2 '>Save</button>
            </div>

  

        </form>
      
         
            </Modal.Body>
      </Modal>    


    <div className="d-flex justify-content-between align-items-center   p-4">

        <div>
        <h3 className='headCatgory'>Recipe Table Details</h3>
        <p className='categoryParagaph'>You can check all details</p>
        </div>
          <div className="yarab">

       {loginData?.userGroup == "SuperAdmin" ?<button onClick={()=>navigate('/dashboard/recipe-data')} className='btn btn-success btnStyle   me-5'>Add New Recipe</button> : "" }
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
            <select className=' form-control my-3'  onChange={getCateValue} >  
                {categoriesList.map(item=>
                  <option value={item.id}>{item.name}</option>
                )}
              <option value={""}>Search by Category</option>
              </select>  
          </div>
          <div className="col-md-3 ">
             <select className=' form-control my-3 '  onChange={getTagValue}> 
                {tagList.map(item=>
                  <option value={item.id}>{item.name}</option>
                )}
               <option value={""}>Search by Tag</option>
              </select>
          </div>
        </div>
        
            <table className=' table table-striped-columns text-center '>
              <thead>
                <th>Item Name</th>
                <th>Price</th>
                <th>Image</th>
                <th>Description</th>
                <th>Category</th>
                <th>Tag</th>
                <th>Actions</th>
                
              </thead>
              <tbody>
                {recipeList.length >0 ?recipeList.map((item)=>
                  <tr>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td><img className='item-img' src={`${baseImgURLs}${item.imagePath}`} alt="category-img" /></td>
                  <td>{item.description}</td>
                  <td>{item.category[0].name}</td>
                  <td>{item.tag.name}</td>
                 
                  <td>
      <div class="dropdown">
        <button class="btn   " type="button" data-bs-toggle="dropdown" aria-expanded="false">
      <i class="bi bi-three-dots"></i>  
      </button>
        <ul class="dropdown-menu">
          
                  <tr>
              <li><a   onClick={()=> handleShowView(item.id)} class="dropdown-item" ><i class="bi bi-eye  text-success"></i> View</a></li>
            {loginData?.userGroup != "SuperAdmin" ?  <li><a onClick={()=>addToFavs(item.id)}   class="dropdown-item" ><i class="fa-regular fa-heart text-success"></i> Add Favorite</a></li> : "" }
            {loginData?.userGroup != "SystemUser" ? <li><a  onClick={()=>handleShowUpdate(item.id)} class="dropdown-item" ><i class="bi bi-pencil text-success"></i> Edit</a></li> : ""}
            {loginData?.userGroup != "SystemUser" ?  <li><a onClick={()=>handleShow(item.id)}  class="dropdown-item text-danger" ><i  class="bi bi-trash "></i> Delete</a></li> : "" }
               </tr>
        </ul>
      </div>
      </td>
                </tr> ) : <NoData/>}
      
      
                
                
              </tbody>
      
      
            </table>
            {recipeList.length>0 ?<nav aria-label="...">
  <ul class="pagination pagination-md d-flex justify-content-center pt-3">
    
    {arrayOfPages.map(pageNo=>
          <li onClick={()=> getAllRecipes(5,pageNo)} class="page-item"><a class="page-link" >{pageNo}</a></li>

    )}
  </ul>
</nav> : "" }
            </div> 
      






    </>
  )
}
