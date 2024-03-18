import { Request, RequestHandler } from "express";
import { InputError } from "../error/biz-cards-error";
import { auth } from "../service/auth-service";

const extractToken = (req: Request) => {
    const authHeader = req.header("Authorization");
    let jwt = "";
    if (authHeader && authHeader.length > 7 && authHeader.toLowerCase().startsWith("bearer")) {
        return authHeader.substring(7);
    }
    throw new InputError("token is missing", 400);
};

const validateToken: RequestHandler = (req, res, next) => {
    const token = extractToken(req);
    const { email } = auth.verifyJWT(token);
    req.user = { email };
    next();
};

export { validateToken };
