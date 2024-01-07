import { Request, RequestHandler } from "express";
import { InputError } from "../error/Input-Error";
import { auth } from "../service/auth-service";
import { User } from "../database/model/user";
import { extractToken } from "./is-admin";

const isAdminOrUser: RequestHandler = async (req, res, next) => {
    try {
        auth.validId(req.params.id);
        const token = extractToken(req);
        const { email } = auth.verifyJWT(token);
        const { id } = req.params;
        const user = await User.findOne({ email });
        if (!user) throw new InputError("user not found", 401);
        if (id == user.id) return next();
        if (user.isAdmin) return next();
        res.status(401).json({ message: "You are not an admin" });
    } catch (err) {
        next(err);
    }
};

export { isAdminOrUser };
