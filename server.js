import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import multer from "multer";
import ImageRoute from "./routes/ImageRoute.js"

dotenv.config({
    path : ".env"
})

const app = express();
const port = process.env.PORT
const DB = process.env.MONGO_URL

//middleware
const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Ensure the 'uploads' folder exists
    },
    filename : (req,file,cb)=>{
        const suffix = Date.now()+"-"+Math.round(Math.random()*1e9);
        cb(null,suffix + "-" + file.originalname)
    }
})

const filterConfig = (req,file,cb) => {
    if(file.mimetype.startsWith("image")){
        cb(null,true);
    }else{
        cb(null,undefined)
    }
}

//routes
app.use("/api/v1",ImageRoute)

app.use(multer({
    storage : storageConfig,fileFilter : filterConfig
}).array(
    "upload_images"
))

mongoose.connect(DB).then(
    app.listen(port,()=>{
        console.log(`Server on port ${port} and Database connected`);
    })
).catch((error)=>console.log(error))