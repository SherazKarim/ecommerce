import React, { useEffect, useState } from 'react'
import { RxCross1 } from 'react-icons/rx';

const OrderDetails = ({ setOrderDetailModel, orderDetails }) => {
    const [subtotal, setSubtotal] = useState(0);

    useEffect(() => {
        // Calculate subtotal when orderDetails change
        if (orderDetails && orderDetails.items) {
            const total = orderDetails.items.reduce((ini, item) => {
                return ini + (item.price * item.quantity);
            }, 0);
            setSubtotal(total);
        }
    }, [orderDetails]);
    return (
        <div className='fixed top-0 left-0 z-50 bg-gray-50/[0.25] h-full w-[100vw] transition-all ease duration-300 flex justify-center items-center overflow-auto'>
            <div className="relative flex flex-col justify-center items-center gap-5 bg-white border overflow-y-auto px-16 py-16">
                <button className='cursor-pointer absolute top-5 left-5 text-[1rem]' onClick={() => setOrderDetailModel(false)}>
                    <RxCross1 />
                </button>
                <h1>Order Details</h1>
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-[10px] text-[300] text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Product Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Product Image
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Quantity
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orderDetails && orderDetails?.items?.map((order) => (
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td class="px-6 py-4">
                                        {order.product}
                                    </td>
                                    <td class="px-6 py-4">
                                        <img className='w-[80px]' src={order.image} alt="" />
                                    </td>

                                    <td class="px-6 py-4">
                                        {order.price}
                                    </td>
                                    <td class="px-6 py-4">
                                        {order.quantity}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <div className="flex justify-between items-center w-full">
                    <div className="border rounded-[4px] px-6 py-2">
                        Sub total: <span className='text-red-600'>{subtotal}</span>
                    </div>
                    <button className='px-6 py-2 rounded-[4px] flex justify-center items-center text-[14px] bg-red-600 text-white' onClick={() => setOrderDetailModel(false)}>Ok</button>
                </div>
            </div>
        </div>
    )
}

export default OrderDetails