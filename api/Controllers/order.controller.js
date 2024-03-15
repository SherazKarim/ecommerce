import stripe from "stripe";
import Order from "../Models/order.model.js";

// const YOUR_DOMAIN = 'http://localhost:3000/';
// const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);
export const createOrder = async (req, res) => {
    try {
        const {formData } = req.body;
            const newOrder = new Order({
                ...formData
            })
            console.log(newOrder)
            const savedProduct = await newOrder.save()
            console.log(savedProduct)
            return res.status(200).json({ success: true,message:"Product added successfully!", savedProduct })
    } catch (error) {
      return  res.status(501).json({ success: false, message: "internal server error", error });
    }

}

export const getAllOrders = async (req, res) =>{
    try {
        const allOrders = await Order.find()
        if(!allOrders) {
            return res.status(404).json({success:false, message:"No such orders found!"})
        }
        res.status(200).json({success:true, allOrders})
    } catch (error) {
      return  res.status(501).json({ success: false, message: "internal server error", error });
    }
}
