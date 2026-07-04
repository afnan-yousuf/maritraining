import {NextRequest, NextResponse} from "next/server"
import { verifyToken } from "./lib/auth";

export async function middleware(request, NextRequest) {
    
    const token = request.cookies.get("session")?.value;
    const pathname = request.nexturl.pathname;


    if(pathname.startswith("/dashboard") && !token){
        return NextResponse.redirect(new URL("/", request.url));
    }

    if(token){
        const user = await verifyToken(token);
        if(!user && pathname.startswith("dashboard")){
            return NextResponse.redirect(new URL("/", request.url));
        }

        if(pathname.startswith("/dashboard/admin") && user.role !== "admin"){
            return NextResponse.redirect(new URL("/unauthorize", request.url));
        }
    }

    console.log("Middleware Called")

    return NextResponse.next();

}