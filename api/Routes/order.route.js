import express from 'express'
import { getAllOrders} from '../Controllers/order.controller.js';

const router = express.Router();
router.get('/allOrder', getAllOrders)
export default router