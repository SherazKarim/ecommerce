import React from 'react'
import { useNavigate } from 'react-router-dom'

const Model = ({ message, setMessageModel, fetchAllProducts, FN, setUpdateForm }) => {
  const handleClick = () => {
    setMessageModel(false)
    if(setUpdateForm) setUpdateForm(false)
    if (fetchAllProducts) fetchAllProducts()
    if(FN) FN()
  }
  return (
    <div className='popup fixed min-h-screen w-full bg-black/[0.50] top-0 left-0 flex justify-center items-center'>
      <div className="h-[200px] sm:w-[400px] w-[90%]  rounded-[4px] bg-white shadow flex flex-col  justify-center items-center gap-y-2">
        <p className='text-[18px font-[500] py-5 font-serif'>{message}</p>
        <button onClick={() => handleClick()} className='px-12 py-2 flex justify-center items-center text-[16px] text-[400] bg-red-700 text-white rounded-[]'>OK</button>
      </div>
    </div>
  )
}

export default Model
