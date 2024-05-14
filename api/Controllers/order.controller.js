import stripe from "stripe";
import Order from "../Models/order.model.js";

export const createOrder = async (req, res) => {

    try {
        const { order } = req.body;
        const newOrder = new Order({ ...order });
        // console.log(newOrder)
        await newOrder.save();
        return res.status(201).json({ message: "Order Placed Successfully!", newOrder });
    } catch (error) {
        return res.status(400).json({ message: error.message });
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

export const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const orderData = req.body
        if (!orderData) return res.status(404).json({ message: "couldn't found any data" })
        const updateOrder = await Order.findByIdAndUpdate(id, orderData, {
            new: true
        })

        if (!updateOrder) return res.status(404).json({ success: false, message: 'No product found to update' })

        res.status(200).json({
            success: true,
            message: "Product updated successfully!",
            updateOrder
        })
    } catch (error) {
        return res.status(500).json({ success: false, error: "Internal server error" });
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


export const deleteOrder = async (req, res) => {
    try {
        const { id, orderId } = req.params; // Extract both id and orderId from params
        const order = await Order.findOneAndUpdate(
            { _id: orderId }, // Find the order by orderId
            { $pull: { items: { _id: id } } }, // Pull the item with given id from items array
            { new: true }
        );
        if (!order) {
            return res.status(404).json({ success: false, message: "No such order found!" });
        }

        res.status(200).json({ success: true, message: "Order cancelled successfully!", order });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error", error });
    }
};



