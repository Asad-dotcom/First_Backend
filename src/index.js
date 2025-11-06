import dotenv from "dotenv"
import { app } from "./app.js"
import { connectDB } from "./db/index.js"

dotenv.config({
    path : "./.env"
})

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`App is Listening on port ${process.env.PORT || 8000}`)
    })
})
.catch((err) => {
    console.log("MongoDB connection failed !!", err);
})
.catch((err) =>{
    console.log("DB not Connected", err)
})
















// import express from 'express'
// const app = express()

//    ; ( async () => {
//     try{
//      await  mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//      app.on("error", (error)=> {
//         console.error("ERROR : ", error)
//         throw error
//      })
//      app.listen(process.env.PORT, () => {
//         console.log(`App is listen on ${process.env.PORT}`)
//      })
//     }
//     catch(error){
//         console.error("ERROR : ", error)
//         throw error
//     }
// })()