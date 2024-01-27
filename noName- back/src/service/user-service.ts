import { IUser } from "../@types/user";
import { User } from "../database/model/user";
import { auth } from "./auth-service";
import { InputError } from "../error/Input-Error";
import { Request } from "express";
import { extractToken } from "../middleware/is-admin";
import mongoose from "mongoose";

// creates new User and hashes password
const createUser = async (userData: IUser) => {
    const user = new User(userData);
    user.password = await auth.hashPassword(user.password);
    return user.save();
};

const userType = (user: IUser) => {
    if (user.isAdmin) return "admin";
    if (user.isCaller) return "caller";
    if (user.isMarrying) return "marry";
};

const validateUser = async (email: string, password: string) => {
    const user = await User.findOne({ email });

    if (!user) throw new InputError("Invalid Email", 401);
    const { _id } = user;
    const isPasswordValid = await auth.validatePassword(password, user.password);
    if (!isPasswordValid) throw new InputError("Invalid password", 401);
    const type = userType(user);
    const jwt = auth.generateJWT({ email, _id, type: type });
    return { jwt };
};

const getUserByJWT = async (req: Request) => {
    const JWT = extractToken(req);
    const { email } = auth.verifyJWT(JWT);
    const user = (await User.findOne({ email }).lean()) as IUser;
    return user;
};

export { createUser, validateUser, getUserByJWT };
