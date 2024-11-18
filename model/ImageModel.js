import { model, Schema } from "mongoose";

const ImageSchema = new Schema(
        {
            images : {
                type : [String],
            },
        }
);

const ImageModel = model("Image",ImageSchema);
export default ImageModel;