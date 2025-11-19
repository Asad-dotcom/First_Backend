import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/usermodel.js";

import  jwt  from "jsonwebtoken";

export const verifyJWT = asyncHandler( async(req,  res, next) => {
try {
    const Token =req.cookies?.accessToken || req.header
    ("Authorization")?.replace("Bearer ", "")
    if(!Token){
        throw new ApiError(401, "UnAuthoized Request")
    }
    const decodedToken =  jwt.verify(Token,process.env.ACCESS_TOKEN_SECRET)
    const user =  await User.findById(decodedToken?._id).select("-password -refreshToken")
    if(!user){
        throw new ApiError(401, "invalid Access Token")
    
    }
    req.user = user
    next() 
} catch (error) {
    throw new ApiError(401, error?.message || "invalid Tokken Access")
    
}
})