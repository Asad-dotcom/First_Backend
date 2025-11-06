import {asyncHandler} from '../utils/asyncHandler.js';
const registerUser = asyncHandler(async (req, res) => {
    res.status(200).json({
        message : "Error fixed"
    })
})
const loginUser = asyncHandler(async (req, res) => {
    res.status(200).json({
        message : "ok"
    })
})

export {registerUser, loginUser}