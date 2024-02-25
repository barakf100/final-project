import { Schema } from "mongoose";
import { ITDL } from "../../@types/user";

const TDLSchema = new Schema<ITDL>({
    name: { type: String, required: true, minlength: 2, maxlength: 15 },
    description: { type: String, required: true, minlength: 2, maxlength: 50 },
    isCompleted: { type: Boolean, required: true, default: false },
});

export { TDLSchema };
