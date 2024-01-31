import ROUTES from "../routes/ROUTES";

const links = {
    marryLinks: [{ to: ROUTES.PROFILE, children: "Profile" }],
    callerLinks: [{ to: ROUTES.CALLERPROFILE, children: "Profile" }],
    adminLinks: [{ to: ROUTES.USERS, children: "Users" }],
    alwaysLinks: [],
    logoutLinks: [
        { to: ROUTES.LOGIN, children: "Login" },
        { to: ROUTES.REGISTER, children: "Register" },
    ],
};

export default links;
