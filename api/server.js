import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import productRoute from './Routes/product.route.js'
import userRoute from './Routes/user.route.js'
import connect from './Config/connectDb.js'
import Order from './Models/order.model.js'
import cors from 'cors';
const app = express()
import stripe from 'stripe'
import { createOrder } from './Controllers/order.controller.js'
import ordersRoute from "./Routes/order.route.js"
import reviewRoute from "./Routes/review.route.js"
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
const corsOptions = {
  // origin: "https://ecommerce-76ha.vercel.app",
  origin:'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
connect();

app.use('/api/product', productRoute)
app.use('/api/auth', userRoute)
app.use("/api/orders", ordersRoute)
app.use("/api/reviews", reviewRoute)
app.get("/", (req, res) => {
    res.json("Hello")
})
// const YOUR_DOMAIN = 'https://ecommerce-76ha.vercel.app';
const YOUR_DOMAIN = 'http://localhost:3000/';
const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);

app.post('/api/order/create-checkout-session', async (req, res) => { 
    try { 
      const { order } = req.body; 
      if (!order || order === null) { 
        return res.status(422).json({ message: "required all fields", success: false }) 
      } else { 
        const { payment_method, items, total } = order; 
        if (payment_method.toLowerCase() === "cash on delivery") { 
          createOrder(req, res) 
        } else { 
          const session = await stripeClient.checkout.sessions.create({ 
            payment_method_types: ["card"], 
            mode: 'payment', 
            line_items: items.map(item => ({ 
              price_data: { 
                currency: "usd", 
                product_data: { name: item.product }, 
                unit_amount: item.price * 100, 
              }, 
              quantity: item.quantity, 
            })), 
            success_url: `${YOUR_DOMAIN}success`, 
            cancel_url: `${YOUR_DOMAIN}canceled`, 
          }); 
          console.log(session.url)
          const newOrder = await new Order({ 
            ...order, 
            payment_status: "Paid" 
          }).save()
          res.status(200).json({ 
            success: true, message: "Product added successfully!",
                newOrder, url: session.url 
          }) 
        } 
      } 
    } catch (error) { 
      res.status(501).json({ success: false, message: "internal server error", error }); 
    }
  });

app.listen(process.env.PORT, () => {
    console.log("Backend server is running on port no.", process.env.PORT)
})


