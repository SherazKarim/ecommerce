import React from 'react'
import '../../App.css'

const OrderSummary = ({ cartItems, totalAmt, handleSubmit }) => {
  return (
    <div className="flex flex-col lg:gap-y-3 gap-3 p-3 items-start border h-fit lg:w-[50%] w-full">
    {
      cartItems?.map((item) => (
        <div className="flex flex-col items-start gap-5" key={item._id}>
          <div className="flex items-start gap-3">
            <img src={item.image} alt="" className='border w-16' />
            <div className="flex flex-col">
              <p className='text-[14px] text-[400]'>{item.title}</p>
              <p className='text-[14px] text-[400]'>PKR
                <span className='ml-3 text-red-600 text-[14px] text-[400]'>
                  {item.price}
                </span>
              </p>
              <p className='text-[14px] text-[400]'>QTY
                <span className='ml-3 text-blue-600 text-[14px] text-[400]'>
                  {item.quantity}
                </span>
              </p>
            </div>
          </div>
        </div>
      ))
    }
    <div className="flex justify-center items-center gap-2">
        <p className="border py-2 px-1 rounded-[4px]">
          Subtotal: <span>
            {totalAmt}
          </span>
        </p>
        <button onClick={() => handleSubmit()} className="flex justify-center items-center px-6 py-2 bg-red-600 rounded-[4px] text-white">
          Place Order
        </button>
    </div>
  </div>
  )
}

export default OrderSummary