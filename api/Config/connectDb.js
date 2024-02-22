import mongoose from 'mongoose'

const connect = async()=>{
    try{
        await mongoose.connect(process.env.MONGO)
        console.log("Connected to MongoDb Database")
    }catch(err){
        console.log(err)
    }
}
export default connect;