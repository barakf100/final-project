import { Router } from "express";
import { InputError } from "../error/Input-Error";
import { User } from "../database/model/user";
import { TDL } from "../service/TDL-service";
import { isMarry } from "../middleware/is-marry";

const router = Router();

// get all TDL of user
router.get("/:id", isMarry, async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) throw new InputError("user not found", 401);
        res.status(200).json(user.TDL);
    } catch (err) {
        next(err);
    }
});

// get one TDL of user
router.get("/:id/:TDLId", isMarry, async (req, res, next) => {
    try {
        const tdl = await TDL.getOneTDL(req.params.id, req.params.TDLId);
        res.status(200).json(tdl);
    } catch (err) {
        next(err);
    }
});

// user post new TDL
router.post("/:id", isMarry, async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, { $push: { TDL: req.body } }, { new: true });
        res.json(user);
    } catch (err) {
        next(err);
    }
});

// user update his TDL
// params: id is the user id
//         TDLId is the TDL id
router.patch("/:id/:TDLId", isMarry, async (req, res, next) => {
    try {
        const update = await TDL.updateTDLByUser(req.params.id, req.params.TDLId, req.body);
        res.status(200).json(update);
    } catch (err) {
        next(err);
    }
});

// user delete his TDL
/* params: 
        id is the user id 
        TDLId is the TDL id
    */
router.delete("/:id/:TDLId", isMarry, async (req, res, next) => {
    try {
        const user = await TDL.deleteTDL(req.params.id, req.params.TDLId);
        res.json(user.TDL);
    } catch (err) {
        next(err);
    }
});

export { router as userTDLRouter };
