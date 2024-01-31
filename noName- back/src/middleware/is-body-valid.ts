import { RequestHandler } from "express";
import { InputError } from "../error/Input-Error";
import { Logger } from "../logs-message/logger";
import { log } from "console";

const isBodyValid: RequestHandler = (req, res, next) => {
    if (Object.keys(req.body).length != 3) throw new InputError("invalid body expect 3 keys", 401);
    const { isAccepted, isDeclined, isPending } = req.body;
    if (typeof isAccepted != "boolean") throw new InputError("invalid isAccepted", 401);
    else if (typeof isDeclined != "boolean") throw new InputError("invalid isDeclined", 401);
    else if (typeof isPending != "boolean") throw new InputError("invalid isPending", 401);
    next();
};

export { isBodyValid };
