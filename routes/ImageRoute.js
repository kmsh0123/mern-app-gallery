import {Router} from "express";
import { imageUpload } from "../controller/ImageController.js";

const router = Router();

router.get("/",(req,res)=>(
    res.status(200).json(`Hello I am get method`)
))

router.post("/upload",imageUpload)
    
export default router;