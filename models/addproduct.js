import mongoose from "mongoose";
const adminSchema = new mongoose.Schema({
    title : { type: String, required: true , unique:true},
    price : { type: Number, required: true },
    imageUrl : { type: String, required: true },
    description : { type: String, required: true },
    catogery : {type: String, required: true},
    firstsuppimg : {type: String, required: true},
    secondsuppimg : {type: String, required: true},
})
export default mongoose.models.AddProduct || mongoose.model("AddProduct", adminSchema);