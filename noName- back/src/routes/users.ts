import { Router } from "express";
import { ILogin, IUser } from "../@types/user";
import { User } from "../database/model/user";
import { validateLogin, validateRegistration } from "../middleware/validation";
import { createUser, validateUser } from "../service/user-service";
import { isAdminOrUser } from "../middleware/is-admin-or-user";
import { isUser } from "../middleware/is_user";
import { auth } from "../service/auth-service";
import { InputError } from "../error/Input-Error";
import { isAdminOrCaller } from "../middleware/is-admin-or-caller";
import { isMarry } from "../middleware/is-marry";
import { Logger } from "../logs-message/logger";

const router = Router();
// register new user
router.post("/", validateRegistration, async (req, res, next) => {
    try {
        const saved = await createUser(req.body as IUser);
        res.status(201).json({ message: "user saved", user: saved });
    } catch (err) {
        Logger.error(err);
        next(err);
    }
});

// login user
router.post("/login", validateLogin, async (req, res, next) => {
    try {
        const { email, password } = req.body as ILogin;
        const jwt = await validateUser(email, password);
        res.json(jwt);
    } catch (err) {
        next(err);
    }
});

// admin or caller get all users
router.get("/", isAdminOrCaller, async (req, res, next) => {
    try {
        const allUsers = await User.find();
        res.json(allUsers);
    } catch (err) {
        next(err);
    }
});

// admin get user by id , user get himself
// params: id is the user id
router.get("/:id", isAdminOrUser, async (req, res, next) => {
    try {
        const userDoc = await User.findById(req.params.id);
        if (!userDoc) {
            throw new InputError("user not found", 401);
        }
        const user = userDoc.toObject() as IUser;
        const { password, ...rest } = user;
        res.json({ user: rest });
    } catch (err) {
        next(err);
    }
});

// user update himself
// params: id is the user id
router.put("/:id", isUser, validateRegistration, async (req, res, next) => {
    try {
        // req.body.password = await auth.hashPassword(req.body.password);
        const saved = await User.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });
        res.json(saved);
    } catch (err) {
        console.log(err);
        next(err);
    }
});

router.patch("/nameB/:id", isMarry, async (req, res, next) => {
    try {
        const { nameB, ...otherFields } = req.body;
        if (Object.keys(otherFields).length > 0) {
            throw new InputError("Only the nameB field can be updated.", 400);
        }
        if (nameB) {
            const user = await User.findByIdAndUpdate(req.params.id, { nameB }, { new: true });
            res.json(user);
        }
    } catch (err) {
        next(err);
    }
});

// user update marry date
router.patch("/date/:id", isMarry, async (req, res, next) => {
    try {
        const { marryDate, ...otherFields } = req.body;
        if (Object.keys(otherFields).length > 0) {
            throw new InputError("Only the date field can be updated.", 400);
        }
        if (marryDate) {
            const user = await User.findByIdAndUpdate(req.params.id, { marryDate }, { new: true });
            res.json(user);
        }
    } catch (err) {
        Logger.error(err);
        next(err);
    }
});
// user update his invites
// params: id is the user id
router.patch("/invite/:id", isUser, async (req, res, next) => {
    try {
        const { invites, ...otherFields } = req.body;
        if (Object.keys(otherFields).length > 0) {
            throw new InputError("Only the invites field can be updated.", 400);
        }
        if (invites) {
            const user = await User.findByIdAndUpdate(req.params.id, { $push: { invites: req.body.invites } }, { new: true });
            res.json(user);
        }
    } catch (err) {
        next(err);
    }
});

// admin delete any user , user delete himself
// params: id is the user id
router.delete("/:id", isAdminOrUser, async (req, res, next) => {
    try {
        const deleted = await User.findByIdAndDelete(req.params.id);
        if (!deleted) {
            throw new InputError("user not found", 400);
        }
        res.json({ message: "user deleted", deleted });
    } catch (err) {
        next(err);
    }
});

// user delete his invites
/* params: 
        id is the user id 
        inviteId is the invite id
    */
router.delete("/invite/:id/:inviteId", isUser, async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            throw new InputError("user not found", 400);
        }
        if (user.invites.length === 0) {
            throw new InputError("user has no invites", 400);
        }
        const invites = user.invites.filter((invite) => invite._id!.toString() !== req.params.inviteId);
        user.invites = invites;
        await user.save();
        res.json(user);
    } catch (err) {
        next(err);
    }
});

export { router as usersRouter };
