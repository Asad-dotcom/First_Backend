import {asyncHandler} from '../utils/asyncHandler.js';
import { User } from '../models/usermodel.js';
import { uploadOncloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError} from "../utils/ApiError.js"



const generateAccessAndRefreshTokens = async(userId) => {
    try {
const user = await User.findById(userId)
  const accessTokken =  user.genenateAccessToken() 
 const refreshToken =  user.generateRefreshTokken()
    }
    catch(error){
        throw new ApiError(500, "Somewent Wrong While Gerenating Access and Refresh Tokken")
    }
}

const registerUser = asyncHandler(async (req, res) => {
const {username, email, fullname, password} = req.body
console.log("Email", email)
console.log("Files received:", req.files) // Added debugging

if(username === "" || email === "" || fullname === "" || password === "" ){
    throw new ApiError(400, "All fields must be required")
}
const existedUser = await User.findOne({
    $or : [ {username}, {email}]
})
if(existedUser){
    throw new ApiError(409, "Email Already Existed")
}

if (!req.files?.avatar || !req.files?.avatar[0]?.path) {
    throw new ApiError(400, "Avatar file is required");
}
const avatarLocalPath = req.files.avatar[0].path;
const coverImageLocalPath = req.files?.coverImage?.[0]?.path

if(!avatarLocalPath){
    throw new ApiError(400, "Avtar must be Required")
}

const avatar = await uploadOncloudinary(avatarLocalPath);
console.log("Avatar upload result:", avatar); // Added debugging
const coverImage = await uploadOncloudinary(coverImageLocalPath)
console.log("Cover image upload result:", coverImage); // Added debugging

if (!avatar?.url) {
    throw new ApiError(400, "Error uploading avatar to cloud storage");
}

const user = await User.create({
    fullname,
    avatar : avatar.url,
    coverImage : coverImage?.url|| "",
    email,
    password,
    username : username.toLowerCase()
})
const CreatedUser = await User.findById(user._id).select(
    "-password   -refreshToken" 
)
if(!CreatedUser){
throw new ApiError(500, "Somewent Wrong While Registering the User")
}

return res.status(201).json(
    new ApiResponse(200, CreatedUser, "User register")
)

})



const loginUser = asyncHandler(async (req, res) => {
    const {username, email, password} = res.body
   if (!email || !username){
    throw new ApiError(400, "Email and Password is Required")
   }
 const user =  await user.findOne({
    $or : [{username}, {email}]
 })
if(!user){
    throw new ApiError(404, "user Doest exist")
}

const isPasswordValid = await user.isPasswordCorrect(password)
if(!isPasswordValid){
    throw new ApiError(401, "Incorrect password")
}
})

export {registerUser, loginUser}