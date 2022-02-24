import { Schema, model } from "mongoose";

const logSchema = new Schema(
    {
        token: String,
        userAgent: String,
        status: Boolean,
        user: {
            ref: 'User',
            type: Schema.Types.ObjectId
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

export default model('Log', logSchema);