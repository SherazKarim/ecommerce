import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { newRequest } from '../../components/utills/newRequest';
import Model from '../../Dashbord/model/Model';
import { useSelector } from 'react-redux';
import OrderForm from './OrderForm';
import OrderSummary from './OrderSummary';

const PlaceOrder = ({ totalAmt }) => {
  const { cartItems } = useSelector((state) => state.allCart);
  const [messageModel, setMessageModel] = useState(false)
  const [productInfo , setProductInfo] = useState({})
  const [message, setMessage] = useState("")
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const profileData = JSON.parse(localStorage.getItem('profileData'));
  const { email, name, _id } = profileData || currentUser.user;
  const location = useLocation()
  // console.log("cartItems",cartItems)
  // console.log("shiping charges",shippingCharges)

  const [formData, setFormData] = useState({
    user_name: name,
    email_address: email,
    contact_number: undefined,
    delivery_address: "",
    payment_method: "",
  });

  useEffect(() => {
    let data;
    if(cartItems) {
     data = cartItems.map((item) => {
        return {id:item._id, product: item.title, quantity: item.quantity, price:item.price };
      });
    }
    setProductInfo(data)
  },[])

  // order 
  const order = { 
    user_name: formData.user_name,  
    email_address:formData.email_address ,  
    delivery_address: formData.delivery_address,
    payment_method: formData.payment_method,
    contact_number: formData.contact_number,
    items: productInfo,
    total: location?.state.totalAmt
  };
  // create order functionality 
  const handleSubmit = async (e) => {
    try {
      const res = await newRequest.post("order/create-checkout-session", {order});
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
      <h1 className="text-3xl font-bold mb-6">Place Your Order</h1>
      <div className="container mx-auto py-8 px-4 lg:flex gap-2">
        <div className="container mx-auto py-8 px-4 lg:flex gap-2">
          <OrderForm
            formData={formData}
            setFormData={setFormData}
          />
          <OrderSummary cartItems={cartItems} totalAmt={location?.state.totalAmt} handleSubmit={handleSubmit}/>
        </div>
      </div>
      {messageModel && <Model message={message} setMessageModel={setMessageModel} />}
    </>
  );
};

export default PlaceOrder;
