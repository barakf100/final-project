import { RequestHandler } from "express";
import { extractToken } from "./is-admin";
import { auth } from "../service/auth-service";
import { User } from "../database/model/user";
import { InputError } from "../error/Input-Error";
import { Logger } from "../logs-message/logger";

const isCallerOrMarry: RequestHandler = async (req, res, next) => {
    try {
        const token = extractToken(req);
        const { email } = auth.verifyJWT(token);
        const user = await User.findOne({ email });
        if (!user) throw new InputError("user not found", 401);
        req.user = user;
        const isCaller = user.isCaller;
        const isMarrying = user.isMarrying;
        const isAdmin = user.isAdmin;
        if (isCaller || isMarrying || isAdmin) {
            next();
        } else {
            throw new InputError("You are not authorizrd for this action ", 401);
        }
    } catch (err) {
        next(err);
    }
};

export { isCallerOrMarry };
