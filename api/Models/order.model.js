// models/Order.js

import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user_name: {
    type: String,
    required: true
  },
  email_address: {
    type: String,
    required: true
  },
  delivery_address: {
    type: String,
    required: true
  },
  product_name: {
    type:"String",
    required:true
  },
  quantity:{
    type:Number,
    required:true
  },
  price:{
    type:String,
    required:true
  },
  date: {
    type: Date,
    default: Date.now
  },
  payment_method: {
    type: String,
    required: true,
  },
  payment:{
    type:String,
    default:"pending"
  },
  shipped: {
    type: Boolean,
    default: false,
  }
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
