import { IName } from "./user";

type IIinvited = {
    name: IName;
    phone: string;
    group: string;
    isAccepted?: boolean;
    isDeclined?: boolean;
    isPending?: boolean;
    _id?: string;
};
export { IIinvited };
