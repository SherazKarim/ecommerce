import React from 'react'

const OrderForm = ({ formData, setFormData }) => {
    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };
    return (
        <form className='w-full'>
            <div className="mb-4">
                <label htmlFor="user_name" className="block text-gray-700 mb-2">
                    Your Name
                </label>
                <input
                    type="text"
                    id="user_name"
                    name="user_name"
                    value={formData.user_name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="email_address" className="block text-gray-700 mb-2">
                    Email Address
                </label>
                <input
                    type="email"
                    id="email_address"
                    name="email_address"
                    value={formData.email_address}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="contact_number" className="block text-gray-700 mb-2">
                    Contact Number
                </label>
                <input
                    type="number"
                    id="contact_number"
                    name="contact_number"
                    value={formData.contact_number}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="delivery_address" className="block text-gray-700 mb-2">
                    Delivery Address
                </label>
                <input
                    type="text"
                    id="delivery_address"
                    name="delivery_address"
                    value={formData.delivery_address}
                    onChange={handleChange}
                    placeholder='Add your address here...'
                    className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="payment_method">
                    Select a payment method
                </label>
                <select name="payment_method" id="payment_method" value={formData.payment_method} onChange={handleChange}
                    className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer" required>
                    <option value="Select a payment method">Select a payment method</option>
                    <option value="Stripe">Stripe</option>
                    <option value="Cash on delivery">Cash on delivery</option>
                </select>
            </div>
        </form>
    )
}

export default OrderForm