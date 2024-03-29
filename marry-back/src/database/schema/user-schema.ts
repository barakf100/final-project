import mongoose, { Schema } from "mongoose";
import { IUser } from "../../@types/user";
import { nameSchema } from "./name-schema";
import { addressSchema } from "./address-schema";
import { imageSchema } from "./image-schema";
import { invitedSchema } from "./invited-shcema";
import { TDLSchema } from "./TDL-schema";
import { messageSchema } from "./message-schema";
import dayjs from "dayjs";
const uploadImageSchema = new mongoose.Schema({
    contentType: String,
    image: Buffer,
});
const userSchema = new Schema<IUser>({
    nameA: nameSchema,
    nameB: { type: nameSchema, required: false },
    address: addressSchema,
    image: { type: imageSchema, required: false, default: { alt: "profile", src: "find url" } },
    phone: { required: true, type: "string", minlength: 9, maxlength: 15 },
    email: { required: true, type: "string", minlength: 7, maxlength: 50, unique: true },
    password: { required: true, type: "string" },
    createdAt: { type: "Date", required: false, default: new Date() },
    isAdmin: { type: "boolean", required: false, default: false },
    isMarrying: { type: "boolean", required: true },
    isCaller: { type: "boolean", required: true },
    invites: { type: [invitedSchema], required: false, default: [] },
    TDL: { type: [TDLSchema], required: false, default: [] },
    marryDate: { type: "Date", required: false },
    invitation: { type: uploadImageSchema, required: false },
    invitationMessage: {
        before: messageSchema,
        dayBefore: messageSchema,
        after: messageSchema,
    },
});
export { userSchema };
