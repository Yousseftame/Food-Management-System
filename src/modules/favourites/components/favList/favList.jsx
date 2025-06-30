import React, { useEffect, useState } from 'react'
import recipePic  from '../../../../assets/images/Group 48102127.png'
import Header from '../../../shared/components/header/header'
import axios from 'axios';
import { baseImgURLs, baseURLs } from '../../../../services/urls';
import NoData from '../../../shared/components/noData/noData';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DeleteConfirmation from '../../../shared/components/deleteConfirmation/deleteConfirmation';
import { Bounce, toast } from 'react-toastify';
import { Card } from 'react-bootstrap';




export default function favList() {

  const resolveAfter3Sec = new Promise(resolve => setTimeout(resolve, 3000));


  const [favsList, setFavsList]= useState([]);
  const [favsId, setFavsId] = useState(null);


  // model bootstrap lists delete
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setFavsId(id)
    setShow(true);
  }



  let getAllFavs = async()=>{
    try {
      // let response = await axios.get(`https://upskilling-egypt.com:3006/api/v1/userRecipe/`, {
      //   headers:{
      //      Authorization :localStorage.getItem('token')
      //    }
      //   });
      let response = await axios.get(`${baseURLs}/api/v1/userRecipe/`, {
         headers:{
            Authorization :localStorage.getItem('token')
          }
         });

      //  setArrayOfPages(Array(response.data.totalNumberOfPages).fill().map((_,i)=>i+1)); //pagination
      console.log(response.data.data);
      setFavsList(response.data.data);
      
      
    } catch (error) {
      console.log(error);
      
      
    }

  }

  // delete function
  let deleteFavs =async ()=>{
    try {
       let response = await axios.delete(`https://upskilling-egypt.com:3006/api/v1/userRecipe/${favsId}`,{
         headers:{
           Authorization :localStorage.getItem('token')
         }});
         
         getAllFavs();
         handleClose();              
          toast.promise(
   resolveAfter3Sec,
   {
     pending: 'Promise is pending',
     success: 'successfully deleted!! 👌',
     
   })
         
         
       
     } catch (error) {
       console.log(error);
       
       
     }

 }
















  useEffect ( ()=>{
    getAllFavs();
   

  },[])

  return (
    <>
          <Header title={"Favorite "} title2={"List"} description={"You can now add your items that any user can order it from the Application and you can edit"} imgPath={recipePic}/>

           {/* delete model list  */}
      <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton >
         
        </Modal.Header>
        <Modal.Body>  <DeleteConfirmation deleteItem={'Favorite'}/> </Modal.Body>
        <Modal.Footer>
          <Button variant="btn btn-outline-danger" onClick={deleteFavs}>
            Delete this item
          </Button>
          
        </Modal.Footer>
      </Modal>

          <div className="container">
            <div className="row ">
              {favsList.length >0 ? (favsList.map(fav=>
              <div className="col-md-4 pt-5">
                 <Card className="shadow-sm rounded-4" style={{ width: '100%', border: 'none' }}>
      <div className="position-relative">
        <Card.Img variant="top" src={`${baseImgURLs}${fav.recipe.imagePath}`} className="rounded-top-4 cardImg" />
        <div className="position-absolute top-0 end-0 m-2">
        <i onClick={()=>handleShow(fav.id)} class="fas  fa-heart iconCard"></i>
                </div>
      </div>
      <Card.Body>
        <Card.Title className="fw-medium  textCard  ">{fav.recipe.name}</Card.Title>
        <Card.Text className="text-muted descCard">{fav.recipe.description}</Card.Text>
      </Card.Body>
    </Card>
             
            </div>

              )) : <NoData/> }
              
              
            </div>
          </div>

      
    </>
  )
}
