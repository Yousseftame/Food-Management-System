import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../../../context/AuthContext';

export default function protectedRoute({ children}) {
  let {loginData} =useContext(AuthContext);
    if (localStorage.getItem('token' || loginData)) {
        return children;
        
    }
    else{
        return <Navigate to='/login'/>

    }







  return (
    <div>

      
    </div>
  )
}
