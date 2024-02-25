import { RequestHandler } from "express";
import { extractToken } from "./is-admin";
import { auth } from "../service/auth-service";
import { InputError } from "../error/Input-Error";
import { User } from "../database/model/user";

const isAdminOrCaller: RequestHandler = async (req, res, next) => {
    try {
        const token = extractToken(req);
        const { email } = auth.verifyJWT(token);
        const { isAdmin, isCaller } = await User.findOne({ email });
        if (isAdmin || isCaller) {
            next();
        } else {
            throw new InputError("You are not authorized", 401);
        }
    } catch (err) {
        next(err);
    }
};

export { isAdminOrCaller };
