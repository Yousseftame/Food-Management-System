import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export let AuthContext = createContext(null);

export default function AuthContextProvider(props){

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



    return (<AuthContext.Provider  value={{loginData,saveLoginData,setLoginData}}>  {props.children}  </AuthContext.Provider>)
}
