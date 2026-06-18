// import mongoose from "mongoose"
// import {Server} from "http"
// import app from "./app"
// import dotenv from "dotenv"


// dotenv.config()

// let server:Server
// let isConnected:any = false

// const startServer = async()=>{
//    if(isConnected){
//       return
//    }

//     try {
//        await mongoose.connect(process.env.DB_URL as string,{
//          bufferCommands:false
//       });
//        isConnected = true
//        console.log("connect to db")

//    if(process.env.NODE_ENV !=="production"){
//       server = app.listen((process.env.PORT),()=>{
//       console.log(`server is listening on port:${process.env.PORT}`)
//     })
//    }
   
    
//     } catch (error) {
//        throw new Error("error in start server")
      
     
//     }
// }


import mongoose from "mongoose"
import {Server} from "http"
import app from "./app"
import dotenv from "dotenv"


dotenv.config()

let server:Server
let isConnected:any = false

const startServer = async()=>{
   if(isConnected){
      return
   }

    try {
       await mongoose.connect(process.env.DB_URL as string,{
         bufferCommands:false
      });
       isConnected = true
       console.log("connect to db")

   if(process.env.NODE_ENV !=="production"){
      server = app.listen((process.env.PORT),()=>{
      console.log(`server is listening on port:${process.env.PORT}`)
    })
   }
   
    
    } catch (error) {
       throw new Error("error in start server")
      
     
    }
}

// Local dev: npm run dev চালালে এই block trigger হবে
if (process.env.NODE_ENV !== "production") {
   startServer()
}

// Vercel serverless handler: production-এ প্রতি request-এ এই function call হবে
export default async (req: any, res: any) => {
  try {
    await startServer();
    return (app as any)(req, res);
  } catch (error) {
    console.error("Request handler error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};