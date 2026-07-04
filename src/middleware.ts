import {NextRequest, NextResponse} from "next/server"
import { verifyToken } from "@/app/lib/auth";

export async function middleware(request: NextRequest) {
    
    const token = request.cookies.get("session")?.value;
    const pathname = request.nextUrl.pathname;


    if(pathname.startsWith("/dashboard") && !token){
        return NextResponse.redirect(new URL("/", request.url));
    }

    if(token){
        const user = await verifyToken(token);
        if(!user && pathname.startsWith("dashboard")){
            return NextResponse.redirect(new URL("/", request.url));
        }

        if(pathname.startsWith("/dashboard/admin") && user?.role !== "admin"){
            return NextResponse.redirect(new URL("/unauthorize", request.url));
        }
    }

    console.log("Middleware Called")

    return NextResponse.next();

}