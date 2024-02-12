import { Router } from "express";
import { isMarry } from "../middleware/is-marry";
import { User } from "../database/model/user";
import { InputError } from "../error/Input-Error";
import { Logger } from "../logs-message/logger";
import mongoose from "mongoose";

const router = Router();

router.get("/:id", isMarry, async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) throw new InputError("user not found", 401);
        res.status(200).json(user.invitationMessage);
    } catch (err) {
        next(err);
    }
});

router.post("/:id/:type", isMarry, async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) throw new InputError("user not found", 401);

        if (user.invitationMessage[req.params.type]) throw new InputError("message already exists", 400);

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: { [`invitationMessage.${req.params.type}`]: req.body } },
            { new: true }
        );
        res.json(updatedUser);
    } catch (err) {
        next(err);
    }
});

router.put("/:id/:type", isMarry, async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) throw new InputError("user not found", 401);

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: { [`invitationMessage.${req.params.type}`]: req.body } },
            { new: true }
        );
        res.json(updatedUser);
    } catch (err) {
        next(err);
    }
});

router.delete("/:id/:type", isMarry, async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) throw new InputError("user not found", 401);

        if (!user.invitationMessage[req.params.type]) throw new InputError("message not found", 404);

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $unset: { [`invitationMessage.${req.params.type}`]: "" } },
            { new: true }
        );
        res.json(updatedUser);
    } catch (err) {
        next(err);
    }
});

export { router as userMessageRouter };
