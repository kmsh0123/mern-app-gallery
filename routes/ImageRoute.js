import {Router} from "express";
import { imageUpload, upload } from "../controller/ImageController.js";

const router = Router();

router.get("/",(req,res)=>(
    res.status(200).json(`Hello I am get method`)
))

router.post("/upload",upload,imageUpload)
    
export default router;