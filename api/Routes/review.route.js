import express from 'express'
import { createReview ,updateReview,deleteReview,getProductReviews,updateThumbs} from '../Controllers/review.controller.js'

const router = express.Router();

router.post("/createReview/:productId",createReview)
router.get('/getReviewsByProductId/:id',getProductReviews)
router.put("/updateReviews/:productId/reviewId/:reviewId",updateReview)
router.delete("/productId/:productId/deleteReview/reviewId/:id",deleteReview)

router.post("/updateThumbs/productId/:productId/reviewId/:reviewId",updateThumbs)

export default router