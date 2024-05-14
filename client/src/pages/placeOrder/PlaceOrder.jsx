import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { newRequest } from '../../components/utills/newRequest';
import Model from '../../Dashbord/model/Model';
import { useSelector } from 'react-redux';
import OrderForm from './OrderForm';
import OrderSummary from './OrderSummary';
import '../../App.css'

const PlaceOrder = ({ totalAmt }) => {
  const { cartItems } = useSelector((state) => state.allCart);
  const [messageModel, setMessageModel] = useState(false)
  const [productInfo, setProductInfo] = useState({})
  const [message, setMessage] = useState("")
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const profileData = JSON.parse(localStorage.getItem('profileData'));
  const { email, name, _id } = profileData || currentUser.user;
  const location = useLocation()

  const [formData, setFormData] = useState({
    user_name: name,
    user_id: _id,
    email_address: email,
    contact_number: undefined,
    delivery_address: "",
    payment_method: "",
  });
  // console.log("userId",formData)
  useEffect(() => {
    let data;
    if (cartItems) {
      data = cartItems.map((item) => {
        return { id: item._id, product: item.title, quantity: item.quantity, price: item.price, image: item.image[0] };
      });
    }
    setProductInfo(data)
  }, [])

  // order 
  const order = {
    user_name: formData.user_name,
    user_id: formData.user_id,
    email_address: formData.email_address,
    delivery_address: formData.delivery_address,
    payment_method: formData.payment_method,
    contact_number: formData.contact_number,
    items: productInfo,
    total: location?.state?.totalAmt
  };

  const validateForm = () => {
    if (formData.delivery_address === "" || formData.payment_method === "" || formData.contact_number === "") {
      setMessageModel(true)
      setMessage("All fields required!")
      return false
    }

    return true
  }
  const handleSubmit = async (e) => {
    try {
      if (validateForm()) {
        const res = await newRequest.post("order/create-checkout-session", { order });
        const data = res.data;
        if (data.url) {
          window.location = data.url;
        }

        setMessage(res.data.message)
        setMessageModel(true)
      }
    } catch (err) {
      console.error("Error during checkout:", err);
    }
  };
  return (
    <>
      <div className="container mx-auto py-8 px-4 gap-2">
        <h1 className="text-3xl font-bold mb-6">Place Your Order</h1>
        <div className="container mx-auto py-8 px-4 lg:flex gap-2">
          <OrderForm
            formData={formData}
            setFormData={setFormData}
          />
          <OrderSummary cartItems={cartItems} totalAmt={location?.state.totalAmt} handleSubmit={handleSubmit} />
        </div>
      </div>
      {messageModel && <Model message={message} setMessageModel={setMessageModel} />}
    </>
  );
};

export default PlaceOrder;
