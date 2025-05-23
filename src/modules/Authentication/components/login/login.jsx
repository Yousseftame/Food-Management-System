import React from 'react'
import logo from '../../../../assets/images/4 3.png'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';







 
export default function login({saveLoginData}) {
     



  let navigate = useNavigate();
  let {register,formState:{errors} ,handleSubmit} = useForm();
 
  const onSubmit = async(data)=> {
    // console.log(data);
    
    try {
    //success
    let response = await axios.post('https://upskilling-egypt.com:3006/api/v1/Users/Login',data);
    localStorage.setItem('token',response.data.token);
    saveLoginData();
    navigate('/dashboard');
     toast.success('Login successful!', {
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
 toast.error('  Email or Password not Correct', {
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
              <h4>Log in</h4>
              <span className='text-muted'>Welcome Back! Please enter your details</span>
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
              })} type="text" className="form-control" placeholder="Email" aria-label="Username" aria-describedby="addon-wrapping"/>
              </div>
              {errors.email&&<span className='text-danger'>{errors.email.message}   </span>}

              <div className="input-group flex-nowrap mt-3">
              <span className="input-group-text" id="addon-wrapping"> <i className="fa-solid fa-lock"></i></span>
              <input  placeholder='password' className="form-control" type='password' {...register("password",{
                required:'password is required',
                pattern:{
                  value:/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/,
                  message:'The password must include at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 6 characters long.'
                }

              })}/>
              </div>
              {errors.password&&<span className='text-danger ps-1'>{errors.password.message}</span>}


              <div className='d-flex justify-content-between mt-2 '>
                <Link className='text-black text-decoration-none' to='/register'> Register Now? </Link>
                <Link className='text-success  text-decoration-none' to={'/forget-pass'}> Forget Password? </Link>
               
              </div>

              <button   className='auth-button btn btn-success w-100 my-4'>Login </button>
              


            </form>
         
                  



          </div>
        </div>
      </div>

    </div>
  )
}
