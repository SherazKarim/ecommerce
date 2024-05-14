import mongoose, { mongo } from "mongoose";
import { Schema } from "mongoose";

const reviewSchema = new Schema({
    productId:{
        type: String,
        required : false
    },
    name:{
        type: String,
        required : true
    },
    image:{
        type: String,
        required : false
    },
    email:{
        type: String,
        required : true
    },
    ratings:{
        type:Number,
        required : true
    },
    review:{
        type:String,
        required: true
    },
   
},{
    timestamps:true
})

const Review = mongoose.model("Review",reviewSchema)
export default Review