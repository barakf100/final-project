import { auth } from "../service/auth-service";
import { User } from "./model/user";
import { users } from "./initDB/usersInit";
import { Logger } from "../logs-message/logger";

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
        Logger.info("DB initialized with users.");
    }
};

export default initDB;
