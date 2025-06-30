import React, { useEffect, useState } from 'react'
import logo from '../../../../assets/images/4 3.png'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';




export default function resetPass() {
    
    const [isFirstPassVisible, setIsFirstPassVisible] = useState(false); // eye flash password
    const [isSecondPassVisible, setIsSecondPassVisible] = useState(false); // eye flash password

     



  const navigate = useNavigate();
  const location = useLocation();  
  let {register,formState:{errors , isSubmitting} ,handleSubmit, watch,trigger} = useForm({defaultValues :{ email:location.state}, // to set email in email input
     mode:'onChange'}); // (watch , trigger also with me) to make the match between password and confirm password REALTIME match noy only when i click! 

 
  const onSubmit = async(data)=> {
    // console.log(data);
    
    try {
    //success
    let response = await axios.post('https://upskilling-egypt.com:3006/api/v1/Users/Reset',data);
    console.log(response);
      toast.success('Password Updated Successfully', {
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
    navigate("/Login");      
    

  } catch (error) {
    //failure
    toast.error(error?.response?.data?.message || 'Email or Password not Correct' )
    console.log(error);
  
  }
  }
  
  useEffect(()=>{
    if(watch('confirmPassword'))
    {
      trigger("confirmPassword");
    
    }

  },[watch('password'), trigger ,watch]);

  
  return (
    
    <div className="auth-container ">
      <div className="container-fluid overlay">
        <div className="row  vh-100 align-items-center justify-content-center">
          <div className="col-md-6 bg-white rounded-3 p-5">
            <div className="logo-container  text-center ">
              <img className='w-50' src={logo} alt="food-recipe-logo" />
            </div>
            <div className="title my-3">
              <h4> Reset  Password</h4>
              <span className='text-muted'>Please Enter Your Otp  or Check Your Inbox</span>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className=' mt-4 ' >

              <div className="input-group flex-nowrap">
              <span className="input-group-text" id="addon-wrapping"><i className="fa-solid fa-envelope"></i></span>
              <input {...register('email',{
                
                required:'email is required',
                pattern:{
                  value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message:'Email not valid, enter a valid email'
                }
              })} type="text" className="form-control" placeholder="Email" aria-label="Username" aria-describedby="addon-wrapping" disabled/>
              </div>
              {errors.email&&<span className='text-danger ps-1'>{errors.email.message||"invalid email"}</span>}
      
               <div className="input-group flex-nowrap mt-3">
              <span className="input-group-text" id="addon-wrapping"> <i class="fa-solid fa-mobile-screen-button"></i></span>
             <input  placeholder='OTP' className="form-control" type='text' {...register("seed",{required:"OTP is required"})}/>
              </div>
              {errors.seed?.type=="required"&&<span className='text-danger ps-1'>{errors.seed.message}</span>}


              <div className="input-group flex-nowrap mt-3">
              <span className="input-group-text" id="addon-wrapping"> <i className="fa-solid fa-lock"></i></span>
              <input  placeholder=' Your New Password' className="form-control" name='password' type={isFirstPassVisible ? 'text' : 'password'} 
              
              {...register("password",{required:"new password is required",
                pattern:{
                value:/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/,
                 message:'The password must include at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 6 characters long.'
              }
              })}/>
              <button type='button' onClick={()=>setIsFirstPassVisible((prev)=>!prev)}  
                onMouseDown={(e)=> e.preventDefault()} onMouseUp={(e)=> e.preventDefault} // to prevent the feature of unfocus when i click on the icon 
               className="input-group-text" id="addon-wrapping">
                <i className= {`fa-solid ${isFirstPassVisible ? "fa-eye " : "fa-eye-slash"}`}></i></button>
               
              </div>
              {errors.password&&<span className='text-danger ps-1'>{errors.password.message } </span>}

               <div className="input-group flex-nowrap mt-3">
              <span className="input-group-text" id="addon-wrapping"> <i className="fa-solid fa-lock"></i></span>
             <input  placeholder='Confirm Password' className="form-control" type={isSecondPassVisible? 'text' : 'password'}
             {...register("confirmPassword",
              {required:'confirm password is required' ,
            //  validate: (confirmPassword)=> confirmPassword=== watch("password")? "" : "Password Not Matched ! " // match passowrd and confirm password
             })} />
            
             <button type='button' onClick={()=>setIsSecondPassVisible((prev)=>!prev)} 
              onMouseDown={(e)=> e.preventDefault()} onMouseUp={(e)=> e.preventDefault} // to prevent the feature of unfocus when i click on the icon 
              className="input-group-text" id="addon-wrapping">
               <i className={`fa-solid ${isSecondPassVisible ? "fa-eye" : "fa-eye-slash" } `}></i></button>

              </div>
              
              {errors.confirmPassword&&<span className='text-danger ps-1'>{errors.confirmPassword.message}</span>}
              


              

              <button  disabled={isSubmitting} className='auth-button btn btn-success w-100 my-4'> {isSubmitting? "Submitting ..." : "Reset Password" } </button>
              

            

            </form>
         
                  



          </div>
        </div>
      </div>

    </div>
  )
}
