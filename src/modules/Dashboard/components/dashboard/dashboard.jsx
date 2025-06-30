import React, { useContext } from 'react'
import Header from '../../../shared/components/header/header'
import dashboardPic from '../../../../assets/images/Group 48102098.png'
import dashArrow from '../../../../assets/images/Group 48101259.png'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../../context/AuthContext'


export default function dashboard() {
     let {loginData} = useContext(AuthContext)
      const navigate =useNavigate();
      
  
/////////////// home //////////////////////

  return (
    <>
    <Header title={" Welcome "} title2={loginData.userName} description={'This is a welcoming screen for the entry of the application , you can now see the options'} imgPath={dashboardPic} />



    <div className="dashboardFooter d-flex  align-items-center justify-content-between">
      <div className='speacingCaption'>
      <h4>Fill the <span>Recipes</span>  !</h4>
      <p>you can now fill the meals easily using the table and form ,<br /> click here and sill it with the table !</p>
      </div>
      

      <button onClick={()=>{navigate('/dashboard/recipes')} } className='  btn  btn-success btnStyle '>Fill  recipes <img src={dashArrow}alt="" /> </button>

          </div>


    




      
    </>
  )
}
