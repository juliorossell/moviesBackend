import { Schema, model } from "mongoose";

const movieSchema = new Schema(
    {
        name: String,
        category: String,
        imgURL: String
    },
    {
        timestamps: true,
        versionKey: false
    }
)

export default model('Movie', movieSchema);