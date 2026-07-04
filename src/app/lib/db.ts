import mongoose from "mongoose";

let isConnected = false;

export default async function connect(){

    if(isConnected) return;

    try{

        if (!process.env.MONGODB_URI) {
         throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
        }
        await mongoose.connect(process.env.MONGODB_URI);
        isConnected = true;
        console.log("MongoDB connected")

    }
    catch(error){
        console.log("mongodb Error", error)
    }


}