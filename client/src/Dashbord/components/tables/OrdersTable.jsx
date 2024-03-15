import React from 'react'

const OrdersTable = ({ allOrders }) => {
    console.log(allOrders)
    return (
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Date
                        </th>
                        <th scope="col" class="px-6 py-3">
                            user name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            email
                        </th>
                        <th scope="col" class="px-6 py-3">
                            product name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            price
                        </th>
                        <th scope="col" class="px-6 py-3">
                            delivery address
                        </th>
                        <th scope="col" class="px-6 py-3">
                            payment method
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Payment
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Shipped
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allOrders && allOrders?.map((order) => (
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {order.date.slice(0, 10)}
                                </th>
                                <td class="px-6 py-4">
                                    {order.user_name}
                                </td>
                                <td class="px-6 py-4">
                                    {order.email_address}
                                </td>
                                <td class="px-6 py-4">
                                   {order.product_name}
                                </td>
                                <td class="px-6 py-4">
                                   {order.price}
                                </td>
                                <td class="px-6 py-4">
                                    {order.delivery_address}
                                </td>
                                <td class="px-6 py-4">
                                    {order.payment_method}
                                </td>
                                <td class={`px-6 py-4 ${order.payment === "Paid" ? "text-blue-600 " : "text-red-600"}`}>
                                    {order.payment}
                                </td>
                                <td class="px-6 py-4">
                                    {order.shipped.toString()}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default OrdersTable