import  connect  from "@/app/lib/db"
import { NextRequest, NextResponse } from "next/server";
import User from "@/app/models/User";
import bcrypt from "bcryptjs";
import {createToken} from "@/app/lib/auth";


export async function POST(request, NextRequest) {

    await connect();

    const body = await request.json();

    const {email, password} = body;
    const user = await User.findOne({email});


    if(!user){
        return NextResponse.json({
            success: false,
            message: "Invalid email or password",
        }, {status: 401})
    }

    const isPasswordcorrect =  await bcrypt.compare(password, user.password)

    if(!isPasswordcorrect){
        return NextResponse.json({
            success: false,
            message: "Invalid email or password",
        }, {status: 401})
    }


    const token = await createToken({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    })



    const response = NextResponse.json({
        success: true,
        message: "Login successfull",
        user:{
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        }
    })


    response.cookies.set("session", token,{
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
    })

    

    return response;


}