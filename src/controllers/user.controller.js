import {asyncHandler} from '../utils/asyncHandler.js'
import { apiError } from '../utils/apiError.js'
import {User} from '../models/user.model.js';
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { use } from 'react'
const registerUser = asyncHandler(async (req, res) =>{
   res.status(200).json({
    message: "ok"
   })
const {username, email, fullName, password} = req.body
console.log("email", email);

if ([fullName, username, email,password].some((field) =>
field?.trim() === "")) {
   throw new apiError(400,"all fields are required")
}
   const exsistance=User.findOne({
      $or:[{username}, {email}]
   })
if (exsistance) {
   throw new apiError(409, "user with email or username already exsist")


}

const avatarLocalPath = req.file?.avatar[0]?.path;
const coverImageLocalPath = req.files?.coverImage[0]?.path;
if (!avatarLocalPath) {
   throw new apiError(400, "avata file is require")
}

const avatar = await uploadOnCloudinary(avatarLocalPath)
const coverImage = await uploadOnCloudinary(coverImageLocalPath);

if (!avatar) {
   throw new apiError(400, "avata file is require");
}

const user = await User.create({
   fullName,
   avatar: avatar.url,
   coverImage: coverImage?.url ||"",
   email,
   password,
   username: username.toLoverCase,
})

const createdUser = await User.findById(user._id).select(
   "-paassword -refreshToken"
)
if(!createdUser){
   throw new apiError(500, "something went wrong")
}

})



export {registerUser}