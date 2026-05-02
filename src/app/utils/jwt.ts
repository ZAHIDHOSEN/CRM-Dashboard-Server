import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";



export const createToken = (payload:JwtPayload,select:string,expiresIn:string)=>{
    
    const token = jwt.sign(payload,select,{expiresIn}as SignOptions)

    return token


}
  


export const verifyToken = (token:string,secret:string)=>{
    const verifiedToken = jwt.verify(token,secret)

    return verifiedToken
}