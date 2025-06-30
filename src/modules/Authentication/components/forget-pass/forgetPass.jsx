import React from 'react'
import logo from '../../../../assets/images/4 3.png'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';
import { axiosInstance, USERS_URLS } from '../../../../services/urls';


export default function forgetPass() {
  
      
      
 
       
 
 
 
   let navigate = useNavigate();
   let {register,formState:{errors,isSubmitting} ,handleSubmit } = useForm();
  
   const onSubmit = async(data)=> {
     // console.log(data);
     
     try {
     //success
     let response = await axios.post('https://upskilling-egypt.com:3006/api/v1/Users/Reset/Request',data);
    //  let response = await axiosInstance.post(USERS_URLS.FORGET_PASS, data);
     console.log(response);
     navigate('/reset-password' ,{state:data.email} ); // uselocation
      toast.success('OTP  sent!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
      });
       
     
 
 
 
 
   } catch (error) {
     //failure
     toast.error(  error?.response?.data?.message || ' Email is not Valid!', {
position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "dark",
transition: Bounce,
});
     console.log(error);
 
 
     
   }
   }
   
 
   
   return (
     
     <div className="auth-container ">
       <div className="container-fluid overlay">
         <div className="row  vh-100 align-items-center justify-content-center">
           <div className="col-md-6 bg-white rounded-3 p-5">
             <div className="logo-container  text-center ">
               <img className='w-50' src={logo} alt="food-recipe-logo" />
             </div>
             <div className="title my-3">
               <h4>Forgot Your Password?</h4>
               <span className='text-muted'>No worries! Please enter your email and we will send a password reset link </span>
             </div>
             <form onSubmit={handleSubmit(onSubmit)} className=' mt-4 ' >
 
               <div className="input-group flex-nowrap   mb-3">
               <span className="input-group-text" id="addon-wrapping"><i className="fa-solid fa-envelope"></i></span>
               <input {...register('email',{ // لازم دى تبقى شبه اللى مستنيها من الباك اند
                 required:'email is required',
                 pattern:{
                   value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                   message:'Email not valid, enter a valid email'
                 }
               })} type="text" className="form-control" placeholder="Email" aria-label="Username" aria-describedby="addon-wrapping"/>

               </div>
                 {errors.email&&<span className='text-danger   mt-3    '>{errors.email.message}  </span>}

 
              
 
               <button  disabled={isSubmitting}  className='auth-button btn btn-success w-100 '>  {isSubmitting? "Submitting ...":"Sumbit "} </button>
               
 
               
 
             </form>
          
                   
 
 
 
           </div>
         </div>
       </div>
 
     </div>
   )
 }
