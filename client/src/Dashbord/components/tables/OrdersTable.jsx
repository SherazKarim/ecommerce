import React, { useEffect, useState } from 'react';
import OrderDetails from '../orderDetailModel/OrderDetails';
import { newRequest } from '../../../components/utills/newRequest';
import { useParams } from 'react-router-dom';


const OrdersTable = ({ allOrders }) => {
    const [openOrderDetailModel, setOrderDetailModel] = useState(false);
    const [orderDetails, setOrderDetails] = useState(null);
    const [productStatuses, setProductStatuses] = useState({});

    const handleClick = (data) => {
        setOrderDetailModel(true);
        setOrderDetails(data);
    };

    useEffect(() => {
        if (allOrders) {
            const statuses = {};
            allOrders.forEach(order => {
                statuses[order._id] = order.status;
            });
            setProductStatuses(statuses);
        }
    }, [allOrders]);
    
    const handleChange = async (e, orderId) => {
        const newStatus = e.target.value;
        try {
            const response = await newRequest.put(`orders/updateOrder/${orderId}`, {
                status: newStatus
            });
            const updatedOrder = response.data;
            setProductStatuses(prevStatuses => ({
                ...prevStatuses,
                [orderId]: updatedOrder.status
            }));
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-[10px] text-[300] text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Date</th>
                            <th scope="col" className="px-6 py-3">user name</th>
                            <th scope="col" className="px-6 py-3">email</th>
                            <th scope="col" className="px-6 py-3">product name</th>
                            <th scope="col" className="px-6 py-3">Total</th>
                            <th scope="col" className="px-6 py-3">delivery address</th>
                            <th scope="col" className="px-6 py-3">payment method</th>
                            <th scope="col" className="px-6 py-3">Payment</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allOrders && allOrders.map((order) => (
                            <tr key={order._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4">{order.date.slice(0, 10)}</td>
                                <td className="px-6 py-4">{order.user_name}</td>
                                <td className="px-6 py-4">{order.email_address}</td>
                                <td className="px-6 py-4">
                                    {order?.items?.length > 0 && order.items.map((item) => (
                                        <div className="flex flex-col truncate" key={item._id}>
                                            <p className="flex gap-4">{item.product}</p>
                                        </div>
                                    ))}
                                </td>
                                <td className="px-6 py-4">{order.total}</td>
                                <td className="px-6 py-4">
                                    <p className="truncate">{order.delivery_address}</p>
                                </td>
                                <td className="px-6 py-4">{order.payment_method}</td>
                                <td className={`px-6 py-4`}>
                                    <p className={`px-3 py-[2px] flex justify-center items-center text-[14px] rounded-full text-white ${order.payment_status === "Paid" || productStatuses[order._id] === "Shipped" ? "bg-blue-600 " : "bg-red-600"}`}>
                                        {order.payment_status}
                                    </p>
                                </td>
                                <td className="px-6 py-4">
                                    <select className="cursor-pointer" value={productStatuses[order._id]} onChange={(e) => handleChange(e, order._id)}>
                                        <option value="Order placed">Order placed</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Delivered">Delivered</option>
                                    </select>
                                </td>
                                <td className="cursor-pointer" onClick={() => handleClick(order)}>Order Detail</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {openOrderDetailModel && <OrderDetails orderDetails={orderDetails} setOrderDetailModel={setOrderDetailModel} />}
        </>
    );
};

export default OrdersTable;
