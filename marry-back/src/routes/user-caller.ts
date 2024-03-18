import { Router } from "express";
import { isCaller } from "../middleware/is-caller";
import { User } from "../database/model/user";
import { InputError } from "../error/Input-Error";
import { callerMethods, updateInvite } from "../service/caller-service";
import { isBodyValid } from "../middleware/is-body-valid";
import { Logger } from "../logs-message/logger";
import { isCallerOrMarry } from "../middleware/is-marry-or-caller";
const router = Router();

// caller gets user invites
router.get("/:id", isCallerOrMarry, async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) throw new InputError("user not found", 401);
        const invites = user.invites;
        res.status(200).json({ invites });
    } catch (err) {
        next(err);
    }
});

//  caller update invite
router.patch("/:id/:inviteId", isCaller, isBodyValid, async (req, res, next) => {
    try {
        const updateInvites = await updateInvite(req, res, next);
        res.status(200).json({ message: "invite updated", invites: updateInvites });
    } catch (err) {
        Logger.error(err);
        next(err);
    }
});

export { router as userCallerRouter };
