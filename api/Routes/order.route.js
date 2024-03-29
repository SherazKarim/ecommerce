import express from 'express'
import { deleteAllOrders, getAllOrders} from '../Controllers/order.controller.js';

const router = express.Router();
router.get('/allOrder', getAllOrders)
router.delete('/delAllOrders', deleteAllOrders)
export default router