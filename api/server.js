import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import productRoute from './Routes/product.route.js'
import connect from './Config/connectDb.js'
import bodyParser from 'body-parser';
import cors from 'cors';
const app = express()
import stripe from 'stripe'
dotenv.config();
// Use express built-in middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors({origin:"http://localhost:3000",credentials:true}))
app.use('/api/product',productRoute)
const YOUR_DOMAIN = 'http://localhost:3000/';
const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);
app.post('/create-checkout-session', async (req, res) => {
    try {
        const { shippingCharge, items } = req.body;
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
                        unit_amount: shippingCharge * 100,
                    },
                    quantity: 1,
                }
            ],
            success_url: `${YOUR_DOMAIN}success`,
            cancel_url: `${YOUR_DOMAIN}canceled`,
        });
        res.json({ url: session.url });
    } catch (error) {
        res.status(501).json({ success: false, message: "internal server error", error });
    }
});

app.listen(process.env.PORT,()=>{
    connect();
    console.log("Backend server is running on port no.",process.env.PORT)
})