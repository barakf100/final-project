import { Router } from "express";
import { isCaller } from "../middleware/is-caller";
import { User } from "../database/model/user";
import { InputError } from "../error/Input-Error";
import { callerMethods } from "../service/caller-service";
import { isBodyValid } from "../middleware/is-body-valid";
const router = Router();

// caller gets user invites
router.get("/:id", isCaller, async (req, res, next) => {
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
        callerMethods.updateInvite(req, res, next);
        res.status(200).json({ message: "invite updated" });
    } catch (err) {
        next(err);
    }
});

export { router as userCallerRouter };
