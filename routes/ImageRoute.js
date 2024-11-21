import {Router} from "express";
import {deleteAllPhoto, deleteImage, deletePhoto, EditImage, getImageById, getImages, imageUpload} from "../controller/ImageController.js";

const router = Router();

router.get("/get",getImages)

router.get("/get/:id",getImageById)

router.patch("/edit/:id",EditImage)

router.delete("/delete/:id",deletePhoto)

router.post("/deleteImage",deleteImage)

router.post("/deleteAllPhoto",deleteAllPhoto)

router.post("/create",imageUpload)
    
export default router;