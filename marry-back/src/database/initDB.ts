import { auth } from "../service/auth-service";
import { User } from "./model/user";
import { users } from "./initDB/usersInit";

const initDB = async () => {
    const countUsers = await User.countDocuments();
    // if DB is not empty return
    if (countUsers != 0) return;

    // if Users is empty create users
    if (countUsers === 0) {
        for (let user of users) {
            user.password = await auth.hashPassword(user.password);
            const saved = await new User(user).save();
        }
    }
};

export default initDB;
