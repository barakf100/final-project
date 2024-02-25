import { set } from "mongoose";
import { User } from "../database/model/user";
import { InputError } from "../error/Input-Error";
import { ITDL } from "../@types/user";
import { Logger } from "../logs-message/logger";

const TDL = {
    getOneTDL: async (id: string, TDLId: string) => {
        const user = await User.findById(id);
        if (!user) throw new InputError("user not found", 401);
        const TDL = user.TDL.find((TDL) => TDL._id.toString() === TDLId);
        if (!TDL) throw new InputError("TDL not found", 401);
        return TDL;
    },
    updateTDLByUser: async (id: string, TDLId: string, body: any) => {
        if (!body.name || !body.description) throw new InputError("missing data", 401);

        const user = await User.findOneAndUpdate(
            { _id: id, "TDL._id": TDLId },
            { $set: { "TDL.$.name": body.name, "TDL.$.description": body.description } },
            { new: true }
        );

        if (!user) throw new InputError("user not found", 401);
        return user.TDL;
    },
    setTDLAsDone: async (id: string, TDLId: string) => {
        const user = await User.findOne({ _id: id, "TDL._id": TDLId });
        if (!user) throw new InputError("user not found", 401);

        const TDL = user.TDL.find((TDL) => TDL._id.toString() === TDLId);
        if (!TDL) throw new InputError("TDL not found", 401);

        const updatedUser = await User.findOneAndUpdate(
            { _id: id, "TDL._id": TDLId },
            { $set: { "TDL.$.isCompleted": !TDL.isCompleted } },
            { new: true }
        );

        return updatedUser.TDL;
    },
    deleteTDL: async (id: string, TDLId: string) => {
        const user = await User.findById(id);
        if (!user) {
            throw new InputError("user not found", 400);
        }
        if (user.TDL.length === 0) {
            throw new InputError("user has no TDL", 400);
        }
        const TDL = user.TDL.filter((TDL) => TDL._id!.toString() !== TDLId);
        user.TDL = TDL;
        await user.save();
        return user;
    },
};

export { TDL };
