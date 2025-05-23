import React from 'react'
import noDataImg from '../../../../assets/images/nodataimg.png'

export default function noData() {
  return (
    <>
    <div className='text-center '>
      
    <img src={noDataImg} alt="no-data-img" />
    <h3>No Data !</h3>
    <p className='text-muted'>are you sure you want to delete this item ? if you are sure just click on delete it</p>
        </div>

      
    </>
  )
}
