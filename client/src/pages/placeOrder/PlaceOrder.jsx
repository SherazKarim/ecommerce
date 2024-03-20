import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { newRequest } from '../../components/utills/newRequest';
import Model from '../../Dashbord/model/Model';

const PlaceOrder = () => {
  const [productInfo, setProductInfo] = useState(null)
  const [shippingCharges, setShippingCharges] = useState(null)
  const [messageModel, setMessageModel] = useState(false)
  const [message, setMessage] = useState("")
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const profileData = JSON.parse(localStorage.getItem('profileData'));
  const { email, name } = profileData || currentUser.user;
  const location = useLocation()

  const [formData, setFormData] = useState({
    user_name: name,
    email_address: email,
    delivery_address: "",
    payment_method: "",
    product_name: productInfo && productInfo?.subTitle,
    price: productInfo && productInfo?.price  + shippingCharges,
    quantity: productInfo && productInfo.quantity,
  });

  useEffect(() => {
    // Fetch cart items and shipping charges when the component mounts
    if (location.state?.items && location.state.shippingCharge) {
      console.log(location.state?.items)
      let data = null
      location.state?.items.map((item) => {
        data = item;
        return data
      })
      const { price, quantity, subTitle } = data
      setProductInfo(location.state.items)
      setFormData({ ...formData, price: location?.state?.totalAmt, quantity: quantity, product_name: subTitle });
      setShippingCharges(location.state.shippingCharge);
    }
  }, [location.state]);

  // fetching product data 
  // useEffect(() => {
  //   let price = 0;
  //   cartContent?.map((item) => {
  //     price += item.price * item.quantity;
  //     return price;
  //   });
  //   setTotalAmt(price);
  // }, [cartContent]);
  console.log(productInfo)


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // create order functionality 
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await newRequest.post("order/create-checkout-session", {
        items: productInfo,
        shippingCharges,
        formData: formData
      });
      console.log(res)
      const data = res.data;
      if (data.url) {
        window.location = data.url;
      }
      setMessage(res.data.message)
      setMessageModel(true)
    } catch (err) {
      console.error("Error during checkout:", err);
    }
  };

  // console.log(formData)

  return (
    <>
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Place Your Order</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="user_name" className="block text-gray-700 mb-2">
            Your Name
          </label>
          <input
            type="text"
            id="user_name"
            name="user_name"
            value={formData.user_name}

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
          <label htmlFor="delivery_address" className="block text-gray-700 mb-2">
            Delivery Address
          </label>
          <textarea
            id="delivery_address"
            name="delivery_address"
            value={formData.delivery_address}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="payment_method">
            <select name="payment_method" id="payment_method" value={formData.payment_method} onChange={handleChange}
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer" required>
              <option value="Select a payment method">Select a payment method</option>
              <option value="Stripe">Stripe</option>
              <option value="Cash on delivery">Cash on delivery</option>
            </select>
          </label>
        </div>
        <div className="mb-4">
          <label htmlFor="product_name" className="block text-gray-700 mb-2">
            Product Name
          </label>
          <input
            type="text"
            id="product_name"
            name="product_name"
            value={formData.product_name}
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            readOnly
            required
          />
        </div>
        <div className="flex mb-4 w-full gap-4">
          <div className="flex flex-col items-start gap-2 w-full">
            <label htmlFor="price">Price</label>
            <input type="number" name='price' id='price' value={formData.price} readOnly
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500" required />
          </div>
          <div className="flex flex-col items-start gap-2 w-full">
            <label htmlFor="quantity">Quantity</label>
            <input type="number" name='quantity' id='quantity' value={formData.quantity} readOnly
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500" required />
          </div>
        </div>
        {/* Add more input fields for order details */}
        <button
          type="submit"
          className="bg-indigo-500 text-white hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 font-medium rounded-md text-sm px-5 py-2.5 mr-2 mb-2 shadow-sm"
        >
          Check out
        </button>
      </form>
    </div>
    {messageModel && <Model message={message} setMessageModel={setMessageModel}/>}
    </>
  );
};

export default PlaceOrder;
