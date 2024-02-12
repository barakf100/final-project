import { Router } from "express";
import { InputError } from "../error/Input-Error";
import { User } from "../database/model/user";
import { isMarry } from "../middleware/is-marry";

const router = Router();

// update user invitation
router.post("/:id", isMarry, async (req, res, next) => {
    try {
        const { invitation, ...otherFields } = req.body;
        if (Object.keys(otherFields).length > 0) {
            throw new InputError("Only the invitation field can be updated.", 400);
        }
        if (invitation) {
            const user = await User.findByIdAndUpdate(req.params.id, { invitation }, { new: true });
            res.json(user);
        }
    } catch (err) {
        next(err);
    }
});

export { router as userInvitationRouter };
