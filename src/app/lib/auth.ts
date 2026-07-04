import { jwtVerify, SignJWT } from "jose";


const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function  createToken(payload:{
    id: string,
    name: string,
    email: string,
    role: string
}) {
    return await new SignJWT(payload)
    .setProtectedHeader({alg: "HS256"})
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret)
} //Creat Token


export async function verifyToken(token: string){
    try{
        const {payload} = await jwtVerify(token, secret)
        return payload
    }
    catch{
        return null
    }
}
