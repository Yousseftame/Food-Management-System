import React, { useContext, useEffect, useState } from 'react'
import logo from '../../../../assets/images/4 3.png'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';
import { axiosInstance, USERS_URLS } from '../../../../services/urls';
import { EMAIL_VALIDATION } from '../../../../services/validation';
import { AuthContext } from '../../../../context/AuthContext';

export default function register() {


  const [isFirstPassVisible, setIsFirstPassVisible] = useState(false); // eye flash password
    const [isSecondPassVisible, setIsSecondPassVisible] = useState(false); // eye flash password


    const appendToFormData =(data)=>{             // convert from data to form data then send it to the back end ( because this form inculde file upload data)
      const formData = new FormData();
      formData.append("userName",data.userName);
      formData.append("email",data.email);
      formData.append("country",data.country);
      formData.append("phoneNumber",data.phoneNumber);
      formData.append("password",data.password)
      formData.append("confirmPassword",data.confirmPassword);
      return formData
     }

    
    const navigate = useNavigate();
  const location = useLocation();  
  let {register,formState:{errors , isSubmitting} ,handleSubmit, watch,trigger} = useForm({defaultValues :{ email:location.state}, // to set email in email input
     mode:'onChange'}); // (watch , trigger also with me) to make the match between password and confirm password REALTIME match noy only when i click! 



     // function
     const onSubmit = async(data)=> {
      let finalData = appendToFormData(data);
      
      try {
      //success
      let response = await axios.post('https://upskilling-egypt.com:3006/api/v1/Users/Register',finalData);

      console.log(response);
        toast.success("Account created successfully. A verification code has been sent to your email address" ||response?.data?.message , {
  position: "top-right",
  autoClose: 9000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
  transition: Bounce,
  });
      navigate("/verify-account",{state:data.email});      
      
  
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
              <h4>Register</h4>
              <span className='text-muted'>Hello! Please enter your details</span>
            </div>


            <form onSubmit={handleSubmit(onSubmit)} className=' mt-4 ' >
            <div className="row">
              <div className="col-md-6">

              {/* username */}
              <div className="input-group flex-nowrap">
<span className="input-group-text" id="addon-wrapping"><i class="fa-solid fa-mobile-screen-button"></i></span>
<input {...register('userName', {required:"UserName is required"})} type="text" className="form-control" placeholder="User Name" aria-label="Username" aria-describedby="addon-wrapping"/>
              </div>
{errors.userName&&<span className='text-danger'>{errors.userName.message}   </span>}

                 {/* country */}
           <div className="input-group flex-nowrap pt-3">
           <span className="input-group-text" id="addon-wrapping"><i class="fa-solid fa-mobile-screen-button"></i></span>
          <input {...register('country', {required:"country  is required" 
                })} type="text" className="form-control" placeholder="Country" aria-label="country " aria-describedby="addon-wrapping"/>
              </div>
{errors.country &&<span className='text-danger'>{errors.country.message ||"invalid Field"}   </span>}


                 {/* password */}
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


              </div>





              <div className="col-md-6">

                {/* email */}
              <div className="input-group flex-nowrap ">
              <span className="input-group-text" id="addon-wrapping"><i class="fa-solid fa-mobile-screen-button"></i></span>
              <input {...register('email', EMAIL_VALIDATION)} type="text" className="form-control" placeholder="Email" aria-label="Username" aria-describedby="addon-wrapping"/>
              </div>
              {errors.email&&<span className='text-danger'>{errors.email.message}   </span>}

              {/* phone */}
              <div className="input-group flex-nowrap mt-3">
              <span className="input-group-text" id="addon-wrapping"><i class="fa-solid fa-mobile-screen-button"></i></span>
              <input {...register('phoneNumber', {required: "phone is Required"})} type="text" className="form-control" placeholder="phoneNumber " aria-label="Username" aria-describedby="addon-wrapping"/>
              </div>
              {errors.phoneNumber&&<span className='text-danger'>{errors.phoneNumber.message}   </span>}



              {/* confirmpass */}
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








              </div>

            </div>

            <button  disabled={isSubmitting} className='auth-button btn btn-success w-100    my-4'> {isSubmitting? "Submitting ..." : "Register" } </button>








</form>
          
         

            

            
         
                  



          </div>
        </div>
      </div>

    </div>
  )
}
