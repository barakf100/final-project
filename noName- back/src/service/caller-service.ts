import { RequestHandler } from "express";
import { User } from "../database/model/user";
import { InputError } from "../error/Input-Error";

const updateInvite: RequestHandler = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) throw new InputError("user not found", 401);
        const invite = user.invites.find((invite) => invite._id == req.params.inviteId);
        if (!invite) throw new InputError("invite not found", 401);
        const { isAccepted, isDeclined, isPending } = req.body;
        invite.isAccepted = isAccepted;
        invite.isDeclined = isDeclined;
        invite.isPending = isPending;
        await user.save();
    } catch (err) {
        next(err);
    }
};

const callerMethods = {
    updateInvite,
};

export { callerMethods };
