import {asyncHandler} from '../utils/asyncHandler.js';
import { User } from '../models/usermodel.js';
import { uploadOncloudinary } from "../utils/cloudinary.js"
import { ApiRespone } from '../utils/ApiRespone.js';
const registerUser = asyncHandler(async (req, res) => {
const {username, email, fullname, password} = req.body
console.log("Email", email)
if(username === "" || email === "" || fullname === "" || password === "" ){

    throw new ApiError(400, "All Feild must be requried")
}
const existedUser = await User.findOne({
    $or : [ {username}, {email}]
})
if(existedUser){
    throw new ApiError(409, "Email Already Existed")
}
const avatarLocalPath = req.files?.avatar[0]?.path;
const coverImageLocalPAth = req.files?.coverImage[0]?.path

if(!avatarLocalPath){
    throw new ApiError(400, "Avtar must be Required")
}

const avatar = await uploadOncloudinary(avatarLocalPath);
const LocalImage = await uploadOncloudinary(coverImageLocalPAth)

if(!avatar){
 throw new ApiError(400, "Avtar must be Required")
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
    new ApiRespone(200, CreatedUser, "User register")
)

})
const loginUser = asyncHandler(async (req, res) => {
    res.status(200).json({
        message : "ok"
    })
})

export {registerUser, loginUser}