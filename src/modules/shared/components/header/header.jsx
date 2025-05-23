import React from 'react'

export default function header({title, description, imgPath,title2 }) {
  return (
    <>
    <div className="container-fluid orginialGreenBg">
      <div className="row ">
        <div className="col-md-8  d-flex  align-items-center text-white     ">
          <div>
          <h3 className='headingStyle'> {title}</h3>
          <h4 className='headingStyle2'> {title2} </h4>
          <p className='paragraphStyle'>{description}</p>
          </div>


        </div>
        <div className="col-md-4 d-flex justify-content-end    pe-5 " >
        <img src={imgPath} alt="recipe image" />

        </div>
      </div>
    </div>
      
    </>
  )
}
  
