import mongoose from "mongoose";
import { userSchema } from "../schema/user-schema";
import { invitedSchema } from "../schema/invited-shcema";

const User = mongoose.model("user", userSchema);

export { User };
