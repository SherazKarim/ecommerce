import mongoose from 'mongoose'
const {Schema} = mongoose;

const productSchema = new Schema({
    title:{
        type: String,
        require: true
    },
    desc:{
        type: String,
        // require: true
    },
    subTitle:{
        type:String,
    },
    discount:{
        type: Number,
        // require: true
    },
    price:{
        type: Number,
        // require: true
    },
    image:{
        type: [String],
        // require: true
    },
},{
    timestamps:true
})

export default mongoose.model("Product",productSchema)