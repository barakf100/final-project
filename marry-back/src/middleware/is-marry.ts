import { RequestHandler } from "express";
import { auth } from "../service/auth-service";
import { extractToken } from "./is-admin";
import { User } from "../database/model/user";
import { InputError } from "../error/Input-Error";

const isMarry: RequestHandler = async (req, res, next) => {
    const token = extractToken(req);
    try {
        const { email } = auth.verifyJWT(token);
        const user = await User.findOne({ email });
        if (!user) throw new InputError("user not found", 401);
        req.user = user;
        const isMarry = user?.isMarrying;
        if (isMarry) {
            next();
        } else {
            return res.status(401).json({ message: "You are not marry user" });
        }
    } catch (err) {
        next(err);
    }
};

export { isMarry };
