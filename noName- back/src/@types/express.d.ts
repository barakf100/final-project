// add user to express request
import { IUser } from "./user";

interface MulterFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    destination: string;
    filename: string;
    path: string;
    buffer: Buffer;
}
declare global {
    namespace Express {
        interface Request {
            user?: IUser;
            file?: MulterFile;
        }
    }
}
