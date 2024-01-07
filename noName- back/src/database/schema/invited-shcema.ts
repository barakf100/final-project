import { Schema } from "mongoose";
import { IIinvited } from "../../@types/invited";
import { nameSchema } from "./name-schema";

const invitedSchema = new Schema<IIinvited>({
    name: nameSchema,
    phone: { type: "string", required: true, minlength: 9, maxlength: 15 },
    group: { type: "string", required: true },
    isAccepted: { type: "boolean", required: false, default: false },
    isDeclined: { type: "boolean", required: false, default: false },
    isPending: { type: "boolean", required: false, default: true },
    userId: { type: "string", required: false },
});

export { invitedSchema };
