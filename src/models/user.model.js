import mongoose, {Schema} from 'mongoose';
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { use } from 'react';


const userScehma = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        lowercase:true,
        trim: true,
        index: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase:true,
        trim: true,
        index: true
    },
    fullname:{
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar:{
        type:String, 
        required: true
    },
    cover_image:{
        type:String
    }, 
    watchistory:{
        type: Schema.Types.ObjectId,
        ref: "video"
    },

    password: {
        type: String,
        required:[true, "password is required"]
    },

    refreshToken:{
        type: String,
    },
    createdAt:{
        type: String
    }


})

userScehma.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
    this.password =await bcrypt.hash(this.password, 10);
    next()
})

userScehma.method.isPasswordCorrect = async function(password){
    bcrypt.compare(password, this.password)
}

export const User = mongoose.model("User", userScehma)