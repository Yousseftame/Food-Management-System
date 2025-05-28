import React from 'react'
import errorIcon from '../../../../assets/images/4 3.png'
import errorImg from '../../../../assets/images/Group 48101676.png'
import { Link } from 'react-router-dom'

export default function notfound() {
  return (
    <div className='bg-notFound'>
      <div className="header">
        <img className='errorIconImg' src={errorIcon} alt="erroricon" />
      </div>
      
      <div className="errorCaption d-flex  justify-content-between ">
        <div>

        
        <h2 className='fstErrorHeading'>Oops.... </h2>
        <h2 className='secErrorHeading'>Page  not found </h2>
        <p>This Page doesn’t exist or was removed!</p>
        <p>We suggest you  back to home.</p>

        <button className=' btn btnStyle errorbtn'><Link to='/dashboard'>Back To Home</Link></button>
        </div>
        

        <div className="imgerror404   ps-4">
        <img src={errorImg} alt="errorimg" />
      </div>
        

      </div>
      
      

  

    </div>
  )
}
