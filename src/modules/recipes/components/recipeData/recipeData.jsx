import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'
import dashArrow from '../../../../assets/images/Group 48101259.png'
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';




export default function recipeData() {

  const [categoriesList, setCategoriesList]= useState([]);
  let [tagList,setTagList] =useState([]);
  let {register,formState:{errors},handleSubmit,reset}= useForm();
  const navigate = useNavigate();

      //toastify
      const resolveAfter3Sec = new Promise(resolve => setTimeout(resolve, 3000));


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




   //add function
  let onSubmit = async(data)=>{
   let recipeData = appendToFormData(data);
    try {
        let response = await axios.post(`https://upskilling-egypt.com:3006/api/v1/Recipe/`,recipeData,{
          headers:{
            Authorization :localStorage.getItem('token')
          }}); 
          console.log(response);
          reset();
          navigate('/dashboard/recipes')
          toast.promise(
              resolveAfter3Sec,
              {
                pending: 'Promise is pending',
                success: response.data.message || "Done",
                
              })

        
      } catch (error) {
        console.log(error);
        
  
      }
      

  }

  
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
                

          // console.log(response.data);
          
    setCategoriesList(response.data.data);
      
    } catch (error) {
      console.log(error);
    }}

  


   useEffect ( ()=>{
      getAllTags();
      getAllCategories();
     
  
    },[])
  




  return (
    <>
    
   
      <div className="dashboardFooter d-flex  align-items-center justify-content-between m-4">
            <div className='speacingCaption'>
            <h4>Fill the <span>Recipes</span>  !</h4>
            <p>you can now fill the meals easily using the table and form ,<br /> click here and sill it with the table !</p>
            </div>
            
      
            <button onClick={()=>{navigate('/dashboard/recipes')} } className='  btn  btn-success btnStyle '>All  recipes <img src={dashArrow}alt="" /> </button>
       </div>

       <div className="w-75 m-auto p-5  ">
        <form  onSubmit={handleSubmit(onSubmit)}>
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
              })} type="file" className="form-control custom-file-dropzone border border-success rounded p-4 text-center dragCustom" placeholder="Drag & Drop or Choose a Item Image to Upload " aria-label="Username" aria-describedby="addon-wrapping"/>
              </div>
              {errors.recipeImage&&<span className='text-danger'>{errors.recipeImage.message}   </span>} 

            <div className=' d-flex justify-content-end mt-5'>

            <button type='button' onClick={()=>navigate('/dashboard/recipes')} className='btn btn-outline-success w-25 me-2  '>Cancel</button>
            <button  className='btn btn-success w-25 me-2 '>Save</button>
            </div>

  

        </form>
       </div>

    </>
  )
}
