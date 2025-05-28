// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";



import '@fortawesome/fontawesome-free/css/all.min.css';
import { createBrowserRouter, Navigate, RouterProvider, useNavigate } from 'react-router-dom';
import Login from './modules/Authentication/components/login/login'
import AuthLayout from './modules/shared/components/authLayout/authLayout'
import Register from './modules/Authentication/components/register/register'
import ForgetPass from './modules/Authentication/components/forget-pass/forgetPass'
import ResetPass from './modules/Authentication/components/reset-pass/resetPass'
import VerifyAccount from './modules/Authentication/components/verify-account/verifyAccount';
import NotFound from './modules/shared/components/notfound/notfound';
import MasterLayout from './modules/shared/components/masterLayout/masterLayout';
import Dashboard from './modules/Dashboard/components/dashboard/dashboard';
import RecipeList from './modules/recipes/components/recipeList/recipeList';
import ReceipeData from './modules/recipes/components/recipeData/recipeData';
import CategoriesList from './modules/categories/components/categoriesList/categoriesList';
import CategoriesData from './modules/categories/components/categoriesData/categoriesData';
import UsersList from './modules/users/componets/usersList/usersList';
import FavList from './modules/favourites/components/favList/favList'
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import ProtectedRoute from './modules/shared/components/protectedRoute/protectedRoute';
import { Bounce, ToastContainer } from 'react-toastify'
import ChangePass from './modules/Authentication/components/change-pass/changePassword';



function App() {
  

  const [loginData , setLoginData] = useState(null)
  let saveLoginData = () =>{
    let encodedToken = localStorage.getItem('token'); // get from local storage
    let decodedToken = jwtDecode(encodedToken);   // decode the token 
    // console.log(decodedToken);
    setLoginData(decodedToken); // set the token ( login data user ) in the loginData variable
  }
   

  

  useEffect( ()=>{
    if (localStorage.getItem('token')) {
      saveLoginData();  
    }
  },[])
  


  const Routes = createBrowserRouter([
    {
    
  
      path:'',
      element:<AuthLayout/>,
      errorElement:<NotFound/>,
      children:[
        {
          path:'', 
          element:<Login  saveLoginData={saveLoginData}/>
          
        },
         {
          path:'login', 
          element:<Login saveLoginData={saveLoginData}/>
          
        },
         {
          path:'register', 
          element:<Register/>
          
        },
         {
          path:'forget-password', 
          element:<ForgetPass/>
          
        },
         {
          path:'reset-password', 
          element:<ResetPass/>
          
        },
         {
          path:'verify-account', 
          element:<VerifyAccount/>
          
        },
         {
          path:'change-password', 
          element:<ChangePass saveLoginData={saveLoginData}/>
          
        },
      ],
      
    },
    
    {
      path: '/dashboard',
      element: <ProtectedRoute loginData={loginData}> <MasterLayout setLoginData={setLoginData}  /> </ProtectedRoute> ,
      errorElement:<NotFound/>,
      
      children:[
          {
            index:true,
            element: <Dashboard loginData={loginData}/>
          },
           {
            path:'recipes',
            element: <RecipeList/>
          },
           {
           path:'recipe-data',
            element: <ReceipeData/>
          },
           {
           path:'categories',
            element:<CategoriesList/>
          },
           {
            path:'category-data',
            element: <CategoriesData/>
          },
           {
            path:'users',
            element: <UsersList/>
          },
         
          {
            path:'favs',
            element: <FavList/>
          },
          
      ]


    }


  ])

  return (
    <>
      <RouterProvider router={Routes}></RouterProvider>
      <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
transition={ Bounce}
/>


<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"/>
<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet"/>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    </>
  )
}

export default App
