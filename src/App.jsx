// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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

function App() {

  
  const Routes = createBrowserRouter([
    {
  
      path:'',
      element:<AuthLayout/>,
      errorElement:<NotFound/>,
      children:[
        {
          path:'', 
          element:<Login/>
          
        },
         {
          path:'login', 
          element:<Login/>
          
        },
         {
          path:'register', 
          element:<Register/>
          
        },
         {
          path:'forget-pass', 
          element:<ForgetPass/>
          
        },
         {
          path:'reset-pass', 
          element:<ResetPass/>
          
        },
         {
          path:'verify-account', 
          element:<VerifyAccount/>
          
        },
      ],
      
    },
    
    {
      path: '/dashboard',
      element: <MasterLayout/>,
      errorElement:<NotFound/>,
      
      children:[
          {
            index:true,
            element: <Dashboard/>
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
    </>
  )
}

export default App
