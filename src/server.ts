import mongoose from "mongoose"
import {Server} from "http"
import app from "./app"
import dotenv from "dotenv"


dotenv.config()

let server:Server


const startServer = async()=>{
    try {
       await mongoose.connect(process.env.DB_URL as string)
       console.log("connect to db")


    server = app.listen((process.env.PORT),()=>{
      console.log(`server is listening on port:${process.env.PORT}`)
    })


        
    } catch (error) {
       throw new Error("error in start server")
     
    }
}


startServer()

