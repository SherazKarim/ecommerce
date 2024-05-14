import Review from '../Models/reveiw.model.js'
import Product from '../Models/product.model.js'


export const createReview = async (req, res) => {
    try {
        const { productId } = req.params;
        const { name, email, ratings, review, image, thumbs } = req.body;

        if (!productId || !name || !email || !ratings || !review || !image) {
            return res.status(400).json({ message: "Please provide all required fields", success: false });
        }

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found", success: false });
        }

        const thumbsData = thumbs || { thumbUp: 0, thumbDown: 0, };

        // Push review data into the reviews array
        product.reviews.push({
            productId,
            name,
            email,
            ratings,
            review,
            image,
            thumbs: { thumbsData }
        });


        if (!product.thumbs || !product.thumbs.length) {
            product.thumbs = [thumbsData];
        } else {
            // If thumbs array already exists, but thumbs data is not provided, set default values for the first thumbs object
            if (!thumbs) {
                product.thumbs[0] = thumbsData;
            }
        }

        await product.save();

        return res.status(200).json({ message: "Review added successfully", success: true, product });
    } catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
};



export const updateReview = async (req, res) => {
    try {
        const { productId, reviewId } = req.params;
        const reviewData = req.body;

        if (!reviewData) {
            return res.status(400).json({ success: false, message: "No review data provided" });
        }

        // Find the product by its ID
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        // Find the index of the review in the product's reviews array
        const reviewIndex = product.reviews.findIndex(review => review._id.toString() === reviewId);

        if (reviewIndex === -1) {
            return res.status(404).json({ success: false, message: "Review not found" });
        }

        // Update the review data
        product.reviews[reviewIndex] = { ...product.reviews[reviewIndex], ...reviewData, productId };
        await product.save();

        return res.status(200).json({ success: true, message: "Review updated successfully", updatedReview: product.reviews[reviewIndex] });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Internal server error", error: err.message });
    }
};


export const deleteReview = async (req, res) => {
    try {
        const { productId, id } = req.params;

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        // Find the index of the review in the product's reviews array
        const reviewIndex = product.reviews.findIndex(review => review._id.toString() === id);

        if (reviewIndex === -1) {
            return res.status(404).json({ success: false, message: "Review not found" });
        }

        // Remove the review from the product's reviews array
        product.reviews.splice(reviewIndex, 1);
        await product.save();

        return res.status(200).json({ success: true, message: "Review deleted successfully" });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Internal server error", error: err.message });
    }
};


export const getReview = async (req, res) => {
    try {
        // Find all products that have reviews
        const productsWithReviews = await Product.find({ 'reviews': { $exists: true, $ne: [] } });

        // Extract and flatten the reviews from all products
        const allReviews = productsWithReviews.reduce((acc, product) => {
            acc.push(...product.reviews);
            return acc;
        }, []);

        if (allReviews.length === 0) {
            return res.status(404).json({ success: false, message: "No reviews found" });
        }

        return res.status(200).json({ success: true, data: allReviews });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Internal server error", error: err.message });
    }
};


export const getProductReviews = async (req, res) => {
    try {
        const productId = req.params.id;

        // Find the product by its ID
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        // Get the reviews of the product
        const reviews = product.reviews;

        if (!reviews || reviews.length === 0) {
            return res.status(404).json({ success: false, message: "No reviews found for this product" });
        }

        return res.status(200).json({ success: true, reviews });
    } catch (err) {
        return res.status(500).json({ success: false, message: "Internal server error", error: err.message });
    }
};


export const updateThumbs = async (req, res) => {
    try {
        const { productId, reviewId } = req.params;
        const { action, email } = req.body;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        const review = product.reviews.find(review => review._id.toString() === reviewId);
        if (!review) {
            return res.status(404).json({ success: false, message: "Review not found" });
        }
        let thumbs = review.thumbs;
        const voterIndex = thumbs.voters.indexOf(email);

        // Determine the action based on the current state of the vote
        if (action === 'thumbUp') {
            if (voterIndex === -1) {
                // New vote
                thumbs.reviewliked = true;
                thumbs.thumbUp += 1;
                thumbs.reviewDisliked = false;
                thumbs.voters.push(email);
            } else {
                // Reversing a vote
                thumbs.reviewDisliked = false;
                thumbs.reviewliked =!thumbs.reviewliked; // Toggle the liked state
                if (thumbs.reviewliked || thumbs.thumbDown > 0) {
                    thumbs.thumbUp += 1;
                    thumbs.thumbDown -= 1;
                } else {
                    thumbs.thumbUp -= 1;
                    thumbs.thumbDown += 1;
                }
                thumbs.voters[voterIndex] = email; // Update the voter's email to reflect the change
            }
        } else if (action === 'thumbDown') {
            if (voterIndex === -1) {
                // New vote
                thumbs.reviewDisliked = true;
                thumbs.thumbDown += 1;
                thumbs.reviewliked = false;
                thumbs.voters.push(email);
            } else {
                // Reversing a vote
                thumbs.reviewliked = false;
                thumbs.reviewDisliked =!thumbs.reviewDisliked; // Toggle the liked state
                if (thumbs.reviewDisliked || thumbs.thumbUp > 0) {
                    thumbs.thumbUp -= 1;
                    thumbs.thumbDown += 1;
                } else {
                    thumbs.thumbUp += 1;
                    thumbs.thumbDown -= 1;
                }
                thumbs.voters[voterIndex] = email; // Update the voter's email to reflect the change
            }
        }

        await product.save();
        res.status(200).json({ success: true, message: "Thumbs updated successfully", product });
    } catch (err) {
        res.status(500).json({ success: false, message: "Internal server error", error: err.message });
    }
};











