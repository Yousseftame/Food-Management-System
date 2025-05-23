import React from 'react'
import noDataImg from '../../../../assets/images/nodataimg.png'


export default function deleteConfirmation({deleteItem}) {
  return (
    <>
    <div className="  text-center ">
      <img src={noDataImg} alt="delete-img" />
      <h5 className=' pt-3 '>Delete This {deleteItem} ?</h5>
      <p className='text-muted'>are you sure you want to delete this item ? if you are sure just click on delete it</p>


    </div>
    
       
    </>
  )
}
