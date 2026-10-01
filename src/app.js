import express from "express"
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    Credential: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded());
app.use(express.static("public"))
app.use(cookieParser())


//routes import
import userRouter from './routes/user.router.js'

app.use("/api/users",userRouter)
export {app}