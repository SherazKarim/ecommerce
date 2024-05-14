import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user_name: {
    type: String,
    required: true
  },
  user_id: {
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
  date: {
    type: Date,
    default: Date.now
  },
  payment_method: {
    type: String,
    required: true,
  },
  payment_status: {
    type: String,
    default: "pending"
  },
  status: {
    type: String,
    default: "Order placed",
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      product: {
        type: String,
        required: true
      },
      image: {
        type: String,
        required:true
      },
      quantity: {
        type: Number,
        required: true
      },
      price: {
        type: Number,
        default: 0,
        required: true
      }
    }
  ],
  total: {
    type: Number,
    required: true
  },
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
