import { Router } from "express";
import { InputError } from "../error/Input-Error";
import { User } from "../database/model/user";
import { isMarry } from "../middleware/is-marry";
import multer from "multer";
import fs from "fs";
import { Logger } from "../logs-message/logger";
const router = Router();
const upload = multer();

router.get("/:id", isMarry, async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return next(new InputError("User not found", 404));
        }
        if (!user.invitation) {
            return next(new InputError("No invitation found", 404));
        }
        const img = user.invitation;
        const base64Image = Buffer.from(img.image).toString("base64");
        res.send(base64Image);
    } catch (err) {
        Logger.error(err);
        next(err);
    }
});

router.post("/:id", isMarry, upload.single("image"), async (req, res, next) => {
    const { invitation, ...otherFields } = req.body;
    if (Object.keys(otherFields).length > 0) {
        return next(new InputError("Only the invitation field can be updated.", 400));
    }
    const encode_image = req.file.buffer.toString("base64");
    const finalImg = {
        contentType: req.file.mimetype,
        image: Buffer.from(encode_image, "base64"),
    };
    try {
        const user = await User.findByIdAndUpdate(req.params.id, { invitation: finalImg }, { new: true });
        res.json(user);
    } catch (err) {
        Logger.error(err);
        next(err);
    }
});

router.delete("/:id", isMarry, async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { invitation: { contentType: Buffer.alloc(0), image: Buffer.alloc(0) } },
            { new: true }
        );
    } catch (err) {
        Logger.error(err);
        next(err);
    }
});

export { router as userInvitationRouter };
