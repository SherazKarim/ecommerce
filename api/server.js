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
dotenv.config();
// Use express built-in middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
connect();
// Configure CORS more strictly (might need adjustments)
// app.use(cors({
//     origin: "https://ecom-app-drab.vercel.app", // Replace with your actual frontend URL
//     credentials: true, // Allow cookies for authorized requests
//     methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
//   }));
const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
  };
  app.use(cors(corsOptions));
app.use('/api/product', productRoute)
app.use('/api/auth', userRoute)
app.use("/api/orders", ordersRoute)
app.get("/", (req, res) => {
    res.json("Hello")
})
const YOUR_DOMAIN = 'https://ecom-app-drab.vercel.app/';
const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);

app.post('/api/order/create-checkout-session', async (req, res) => {
    try {
        const { shippingCharges, items, formData } = req.body;
        const { user_name, email_address, delivery_address, payment_method } = formData;
        // console.log(shippingCharges, items)
        if (!user_name, !email_address, !delivery_address, !payment_method) {
            return res.status(404).json({ message: "required all fields", succes: false })
        }

        if (payment_method.toLowerCase() === "cash on delivery") {
            createOrder(req, res)
        } else {
            const session = await stripeClient.checkout.sessions.create({
                payment_method_types: ["card"],
                mode: 'payment',
                line_items: [
                    ...items.map(item => ({
                        price_data: {
                            currency: "usd",
                            product_data: { name: item.title },
                            unit_amount: item.price * 100,
                        },
                        quantity: item.quantity,
                    })),
                    {
                        price_data: {
                            currency: "usd",
                            product_data: { name: "Shipping Charge" },
                            unit_amount: shippingCharges * 100,
                        },
                        quantity: 1,
                    }
                ],
                success_url: `${YOUR_DOMAIN}success`,
                cancel_url: `${YOUR_DOMAIN}canceled`,
            });
            const newOrder = new Order({
                ...formData,
                payment: "Paid"
            })
            console.log(newOrder)
            const savedProduct = await newOrder.save()
            res.status(200).json({ success: true, message: "Product added successfully!", savedProduct, url: session.url })
        }


    } catch (error) {
        res.status(501).json({ success: false, message: "internal server error", error });
    }


});

app.listen(process.env.PORT, () => {
    console.log("Backend server is running on port no.", process.env.PORT)
})


