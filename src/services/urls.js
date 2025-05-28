import axios from "axios";

 const baseURLs= "https://upskilling-egypt.com:3006/api/v1"; //basurl
 export const baseImgURLs = "https://upskilling-egypt.com:3006/";

  export const axiosInstance =axios.create({
    baseURLs:baseURLs,
    headers:{
            Authorization :localStorage.getItem('token')            // لو بعت مع اللوج ان عادى مش هتشوفها و كانها مش موجوده و هتعمل توكن لوحدها . ولو بعتها مع اى ريكوست بعد اللوج ان هياخدها عادى كانها موجوده
          }
 });



 // users
export const USERS_URLS={
    LOGIN : `/Users/Login`,      //endpoint
    FORGET_PASS : `/Users/Reset/Request`,
    RESET : `/Users/Reset` ,         
 }

 // category 
 export const CATEGORY_URLS={
    GET_CATEGORY : '/Category/' ,
    DELETE_CATEGORY:  (id)=> `/Category/${id}`   // if i have parameter i will call it as a function and give it ID
 }

 //recipes
 export const RECIPE_URLS={
   GET_RECIPE : '/Recipe/',
   DELETE_RECIPE :(id)=>`/Recipe/${id}`,
   CREATE_RECIPE :'//Recipe/',

 }

 //tags
 export const TAGE_URLS={
  GET_TAGS : '/tag/',
 }