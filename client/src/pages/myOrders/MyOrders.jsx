import React, { useEffect, useState } from 'react'
import Wrapper from '../../components/wrapper/Wrapper'
import { newRequest } from '../../components/utills/newRequest'
import { useNavigate } from 'react-router-dom'
import Model from '../../Dashbord/model/Model'

const MyOrders = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  const userId = currentUser.user._id;
  const [order, setOrder] = useState()
  const [orders, setOrders] = useState()
  const [messageModel, setMessageModel] = useState(false)
  const [message, setMessage] = useState("")
  useEffect(() => {
    const filterData = order?.filter((val) => val?.user_id === userId)
    setOrders(filterData)
  }, [order])
  
  const fetchOrders = async () => {
    try {
      const response = await newRequest.get("/orders/getOrders");
      const result = await response.data.allOrders;
      setOrder(result)
    } catch (error) {
      console.log(error)
    }
  }


  const cancelOrder = async (orderId, itemID) => {
    const res = await newRequest.delete(`/orders/deleteOrder/${itemID}/orderId/${orderId}`)
    setMessage(res.data.message)
    if (res.status === 200) {
      setMessageModel(true)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])


  return (
    <Wrapper>
      <div className="flex justify-between items-center border px-3 py-3">
        <div className="flex justify-center items-center gap-3">
          <a className='text-red-600' href="#">Orders</a>
        </div>
        {/* <select name="filter" id="filter" className='outline-none border-gray-200 rounded-[4px] cursor-pointer'>
          <option value="filter orders">Filter Orders</option>
          <option value="filter orders">Last 5 Orders</option>
          <option value="filter orders">First Order</option>
        </select> */}
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
        {
          orders && orders.length > 0 ? orders?.map((orderis) => (
            orderis.items.map((item) => (
              <div className="border w-full mt-5">
                <div className="p-2">
                  <p className='text-[14px]'>Order <span className="text-blue-600">#{item._id}</span></p>
                </div>
                <hr />
                <div className="flex flex-col justify-center items-center gap-3 my-2 w-full">
                  <img className='w-[150px]' src={item.image} alt="" />
                  <div className="flex justify-evenly items-center w-full">
                    <p>QTY-{item.quantity}</p>
                    <p>{item.product}</p>z
                    <p>${item.price}</p>
                  </div>
                  <button className='px-6 py-2 self-start ms-5 bg-red-600 text-[14px] text-white rounded-[4px]' onClick={() => cancelOrder(orderis._id, item._id)}>Cancel Order</button>
                </div>

              </div>
            ))
          )) : <h1>NO ordders placed yet!</h1>
        }
      </div>
      {messageModel && <Model message={message} FN={fetchOrders} setMessageModel={setMessageModel} />}
    </Wrapper>
  )
}

export default MyOrders