import { Schema } from "mongoose";
import { IMessages } from "../../@types/user";

const messageSchema = new Schema<IMessages>({
    message: { type: "string", required: true },
});
export { messageSchema };
