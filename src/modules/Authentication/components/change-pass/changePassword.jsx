import React, { useState } from 'react'
import logo from '../../../../assets/images/4 3.png'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';
import { axiosInstance, USERS_URLS } from '../../../../services/urls';
import { EMAIL_VALIDATION } from '../../../../services/validation';

export default function changePassword() {
    const [isFirstPassVisible, setIsFirstPassVisible] = useState(false); // eye flash password
    const [isSecondPassVisible, setIsSecondPassVisible] = useState(false); // eye flash password
    

  let navigate = useNavigate();
  let {register,formState:{errors, isSubmitting} ,handleSubmit} = useForm();
 
  const onChangePass = async(data)=> {
    // console.log(data);
    
    try {
    //success
    let response = await axios.put('https://upskilling-egypt.com:3006/api/v1/Users/ChangePassword',data,
        {
          headers:{
            Authorization :localStorage.getItem('token')
          }});
    //  let response = await axiosInstance.post(USERS_URLS.LOGIN,data);
    
    // localStorage.setItem('token',response.data.token);
    // saveLoginData();
    console.log(response);
    
    navigate('/dashboard'); 
     toast.success( response?.data?.message ||'Password has been updated successfully!', {
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
 toast.error(  error?.response?.data?.message || '  Invalid password', {
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
    <>
     <div className="auth-container ">
          <div className="container-fluid overlay">
            <div className="row  vh-100 align-items-center justify-content-center">
              <div className="col-md-6 bg-white rounded-3 p-5">
                <div className="logo-container  text-center ">
                  <img className='w-50' src={logo} alt="food-recipe-logo" />
                </div>
                <div className="title my-3">
                  <h4>Change Password</h4>
                  <span className='text-muted'>Welcome Back! Please enter your details</span>
                </div>
                <form onSubmit={handleSubmit(onChangePass)} className=' mt-4 ' >
                 {/* old password */}
                <div className="input-group flex-nowrap mt-3">
              <span className="input-group-text" id="addon-wrapping"> <i class="fa-solid fa-key"></i></span>
              <input  placeholder='Enter Your Old Password' className="form-control" name='password' type={isFirstPassVisible ? 'text' : 'password'} 
              
              {...register("oldPassword",{required:"Old Password Is Required",
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
              {errors.oldPassword&&<span className='text-danger ps-1'>{errors.oldPassword.message } </span>}
                

                 {/* new password */}
                  <div className="input-group flex-nowrap mt-3">
              <span className="input-group-text" id="addon-wrapping"> <i className="fa-solid fa-lock"></i></span>
              <input  placeholder=' Enter Your New Password' className="form-control" name='password' type={isSecondPassVisible ? 'text' : 'password'} 
              
              {...register("newPassword",{required:"New Password Is Required",
                pattern:{
                value:/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/,
                 message:'The password must include at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 6 characters long.'
              }
              })}/>
              <button type='button' onClick={()=>setIsSecondPassVisible((prev)=>!prev)}  
                onMouseDown={(e)=> e.preventDefault()} onMouseUp={(e)=> e.preventDefault} // to prevent the feature of unfocus when i click on the icon 
               className="input-group-text" id="addon-wrapping">
                <i className= {`fa-solid ${isSecondPassVisible ? "fa-eye " : "fa-eye-slash"}`}></i></button>
               
              </div>
              {errors.newPassword&&<span className='text-danger ps-1'>{errors.newPassword.message } </span>}

               {/* confrim passowrd */}
                 <div className="input-group flex-nowrap mt-3">
              <span className="input-group-text" id="addon-wrapping"> <i className="fa-solid fa-lock"></i></span>
             <input  placeholder='Confirm Your Password' className="form-control" type={isSecondPassVisible? 'text' : 'password'}
             {...register("confirmNewPassword",
              {required:'confirm password is required' ,
            //  validate: (confirmPassword)=> confirmPassword=== watch("password")? "" : "Password Not Matched ! " // match passowrd and confirm password
             })} />
            
             <button type='button' onClick={()=>setIsSecondPassVisible((prev)=>!prev)} 
              onMouseDown={(e)=> e.preventDefault()} onMouseUp={(e)=> e.preventDefault} // to prevent the feature of unfocus when i click on the icon 
              className="input-group-text" id="addon-wrapping">
               <i className={`fa-solid ${isSecondPassVisible ? "fa-eye" : "fa-eye-slash" } `}></i></button>

              </div>
              
              {errors.confirmNewPassword&&<span className='text-danger ps-1'>{errors.confirmNewPassword.message}</span>}

              
                
                
                
                   <button  disabled={isSubmitting}  className='auth-button btn btn-success w-100 my-4'>{isSubmitting? "Submittting ...": "Update Password"} </button>  
                                {/* issumbitting de 3lashn m3mlsh submit aktr mn mara w a3ml headache 3la back end */}
                              
                
                
                            </form>
                
             
                      
    
    
    
              </div>
            </div>
          </div>
    
        </div>
    </>
  )
}
