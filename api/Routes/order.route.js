import express from 'express'
import { deleteAllOrders, getAllOrders,updateOrder, deleteOrder} from '../Controllers/order.controller.js';

const router = express.Router();
router.get('/getOrders', getAllOrders)
router.delete('/delAllOrders', deleteAllOrders)
router.put('/updateOrder/:id', updateOrder)
router.delete("/deleteOrder/:id/orderId/:orderId", deleteOrder)
export default router