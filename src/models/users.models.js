import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    age: {type: String, required: false},
    password: {type: String, required: true},
    cart: {type:String, unique: true},
    role: {type: String, required: true, default: 'user'},
})

export default mongoose.model('User', userSchema)