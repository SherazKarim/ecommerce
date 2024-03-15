import React from 'react'
import TotalProducts from '../components/cards/TotalProducts'
import TotalSales from '../components/cards/TotalSales'
import TotalUsers from '../components/cards/TotalUsers'
import OrdersTable from '../components/tables/OrdersTable'
import Order from '../pages/orders/Orders'

const Admin = () => {
  return (
    <div className='w-full px-4'>
      <h1 className='text-[14px] font-[500] text-gray-600/[0.90] mb-4'>Admin</h1>
        <div className="flex sm:flex-row flex-col justify-center items-center lg:gap-x-4 gap-y-4">
            <TotalProducts />
            <TotalUsers />
            <TotalSales />
        </div>

        {/* orders table  */}
        <div className="my-4 border p-2 rounded-[4px]">
           <h3 className='text-[14px] font-[500] text-gray-600/[0.90] mb-4'>Latest Orders</h3>
            <Order />
        </div>
    </div>
  )
}

export default Admin