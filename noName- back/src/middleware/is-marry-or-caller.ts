import { RequestHandler } from "express";
import { extractToken } from "./is-admin";
import { auth } from "../service/auth-service";
import { User } from "../database/model/user";
import { InputError } from "../error/Input-Error";

const isCallerOrMarry: RequestHandler = async (req, res, next) => {
    const token = extractToken(req);
    try {
        const { email } = auth.verifyJWT(token);
        const user = await User.findOne({ email });
        if (!user) throw new InputError("user not found", 401);
        req.user = user;
        const isCaller = user.isCaller;
        const isMarrying = user.isMarrying;
        if (isCaller || isMarrying) {
            next();
        } else {
            throw new InputError("You are not a caller", 401);
        }
    } catch (err) {
        next(err);
    }
};

export { isCallerOrMarry };
