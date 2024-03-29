import stripe from "stripe";
import Order from "../Models/order.model.js";

// const YOUR_DOMAIN = 'http://localhost:3000/';
// const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);
export const createOrder = async (req, res) => {

    try {
        const { order } = req.body;
        // console.log(order)
        const newOrder = new Order({...order});
        console.log(newOrder)
        await newOrder.save();
       return res.status(201).json({message:"Product Added Successfully!",newOrder});
      } catch (error) {
      return  res.status(400).json({ message: error.message });
      }
}

export const getAllOrders = async (req, res) => {
    try {
        const allOrders = await Order.find()
        if (!allOrders || allOrders.length < 1) {
            return res.status(404).json({ success: false, message: "No such orders found!" })
        }
        res.status(200).json({ success: true, allOrders })
    } catch (error) {
        return res.status(501).json({ success: false, message: "internal server error", error });
    }
}

//delete all api
export const deleteAllOrders = async (req, res) => {
    try {
        await Order.deleteMany({});
        res.status(200).json({ message: 'All records deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}
