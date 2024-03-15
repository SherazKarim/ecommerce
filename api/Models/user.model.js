import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: false
    },
    phone: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: false
    },
    isAdmin: {
        type: Boolean,
        required: false,
        default:false
    },
    authSource: {
        type: String,
        enum: ['random', 'google'], // Add more authentication sources if needed
        required: true
    }
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);

export default User;
