import { IIinvited } from "./invited";

type IName = {
    first: string;
    middle?: string;
    last: string;
};
type IImage = {
    src: string;
    alt: string;
};
type IAddress = {
    state?: string;
    country: string;
    city: string;
    street: string;
    houseNumber: Number;
    Zip?: string;
};

type IUser = {
    nameA: IName;
    nameB?: IName;
    address: IAddress;
    image?: IImage;
    email: string;
    phone: string;
    password: string;
    isMarrying: boolean;
    isAdmin?: boolean;
    isCaller?: boolean;
    createdAt?: Date;
    invites?: IIinvited[];
    TDL?: ITDL[];
    _id?: string;
    marryDate?: Date;
};

type ILogin = {
    email: string;
    password: string;
};
type IJWTPayload = {
    email: string;
    _id: string;
    type: string;
};
type ITDL = {
    name: string;
    description: string;
    isCompleted: boolean;
    _id?: string;
};
export { IUser, IName, IAddress, IImage, ILogin, IJWTPayload, ITDL };
