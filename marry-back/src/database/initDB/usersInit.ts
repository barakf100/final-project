import { IUser } from "../../@types/user";

const users: IUser[] = [
    {
        nameA: {
            first: "barak",
            middle: "",
            last: "admin",
        },
        address: {
            city: "Anytown",
            country: "Israel",
            state: "",
            street: "admin St",
            houseNumber: 20,
            Zip: "12345",
        },
        image: {
            alt: "user-profile",
            src: "https://picsum.photos/200/300",
        },
        phone: "050-8123091",
        email: "admin@admin.com",
        password: "Aa!123456",
        invites: [],
        isAdmin: true,
        isMarrying: false,
        isCaller: false,
    },
    {
        nameA: {
            first: "barak",
            middle: "",
            last: "marry",
        },
        address: {
            city: "Anytown",
            country: "Israel",
            state: "",
            street: "marry St",
            houseNumber: 20,
            Zip: "12345",
        },
        image: {
            alt: "user-profile",
            src: "https://picsum.photos/200/300",
        },
        phone: "050-8123091",
        email: "marry@marry.com",
        password: "Aa!123456",
        invites: [],
        isAdmin: false,
        isCaller: false,
        isMarrying: true,
    },
    {
        nameA: {
            first: "barak",
            middle: "",
            last: "reg",
        },
        address: {
            city: "Anytown",
            country: "Israel",
            state: "",
            street: "reg St",
            houseNumber: 20,
            Zip: "12345",
        },
        image: {
            alt: "user-profile",
            src: "https://picsum.photos/200/300",
        },
        phone: "050-8123091",
        email: "reg@reg.com",
        password: "Aa!123456",
        invites: [],
        isAdmin: false,
        isMarrying: false,
        isCaller: true,
    },
];

export { users };
