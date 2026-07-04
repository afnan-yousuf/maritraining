import  connect  from "@/lib/db"
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User"



export async function POST(request: NextRequest) {

    await connect();

    const body = await request.json();

    const {name, email, password, role} = body;
    
    if(!name || !email || !password || !role){
        return NextResponse.json(
            {success: false, message: "All feilds are required"},
            {status: 400}
        );
    }

    const existingUser = await User.findOne({email})


    if(existingUser){
        return NextResponse.json(
            {success: false, message: "Email Already Exists"},
            {status: 400}
        )
    }


    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name, 
        email, 
        password: hashedPassword, 
        role: role || "student",
    });

    return NextResponse({
        success: true,
        message: "user registered successfully",
        user:{
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        }
    })


}