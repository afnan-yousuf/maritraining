import mongoose from "mongoose";

let isConnected = false;

export default async function connect(){

    if(isConnected) return;

    try{

        await mongoose.connect(process.env.MONGODB_URI);
        isConnected = true;
        console.log("MongoDB connected")

    }
    catch(error){
        console.log("mongodb Error", error)
    }


}