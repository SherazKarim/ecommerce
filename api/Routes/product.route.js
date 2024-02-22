import express from 'express'
import { createProduct,deleteProduct,getAllProducts,getProduct } from '../Controllers/product.controller.js'

const router = express.Router();

router.post("/",createProduct);
router.delete("/delete/:id",deleteProduct)
router.get("/single/:id",getProduct)
router.get("/get",getAllProducts)

export default router