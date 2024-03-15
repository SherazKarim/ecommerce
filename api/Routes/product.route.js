import express from 'express'
import { createProduct,deleteProduct,getAllProducts,getProduct ,updateProduct } from '../Controllers/product.controller.js'

const router = express.Router();

router.post("/addproduct",createProduct);
router.delete("/delete/:id",deleteProduct)
router.get("/single/:id",getProduct)
router.get("/get",getAllProducts)
router.put('/updateProduct/:id', updateProduct)

export default router