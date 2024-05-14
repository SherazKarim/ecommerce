import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    desc: {
        type: String,
        // require: true
    },
    subTitle: {
        type: String,
    },
    discount: {
        type: Number,
        // require: true
    },
    price: {
        type: Number,
        // require: true
    },
    image: {
        type: [String],
        // require: true
    },
    reviews: [
        {
            productId: {
                type: String,
                required: false
            },
            name: {
                type: String,
                required: true
            },
            image: {
                type: String,
                required: false
            },
            email: {
                type: String,
                required: true
            },
            ratings: {
                type: Number,
                required: true
            },
            review: {
                type: String,
                required: true
            },
            thumbs:
                {
                    thumbUp:{
                        type:Number,
                        default:0,
                        required:false
                    },
                    thumbDown:{
                        type:Number,
                        default:0,
                        required:false
                    }, 
                    reviewliked:{
                        type:Boolean,
                        default:false
                    },
                    reviewDisliked:{
                        type:Boolean,
                        default:false
                    },
                    voters: [{ type: String }]
                }
            
        }, {
            timestamps: true
        }
    ]
}, {
    timestamps: true
})

export default mongoose.model("Product", productSchema)