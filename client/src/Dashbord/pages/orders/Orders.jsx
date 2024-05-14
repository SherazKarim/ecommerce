import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import BreadCrumb from '../../breadcrumbs/BreadCrumb';
import OrdersTable from '../../components/tables/OrdersTable';
import {Spinner} from '../../components/spinner/Spinner'
import { newRequest } from '../../../components/utills/newRequest';

const Orders = () => {
  const [allOrders, setAllOrders] = useState([])
  const [loader, setLoader] = useState(true)
  const location = useLocation();
  const paramsLength = location.pathname.length
  const params = location.pathname.slice(7, paramsLength);
  const fetchAllOrders = async () => {
    try {
      const response = await newRequest.get("orders/getOrders")
      console.log(response)
      if (response.status === 200) {
        setLoader(false)
        setAllOrders(response.data.allOrders)
      }
    } catch (error) {
      setLoader(false)
      console.log(error)
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, []) // Add an empty dependency array to run the effect only once

  return (
    <div className='px-3'>
      <BreadCrumb params={params} />
      {/* table  */}
      {loader ?  <Spinner/>: allOrders.length < 1 ? 
      <h1>No orders placed yet!</h1> :
        <OrdersTable allOrders={allOrders}/>
      }
    </div>
  )
}

export default Orders