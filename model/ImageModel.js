import { model, Schema } from "mongoose";

const ImageSchema = new Schema(
        {
            images : {
                type : [String],
            },
        },
        {
            timestamps: true,
        }
);

const ImageModel = model("Image",ImageSchema);
export default ImageModel;