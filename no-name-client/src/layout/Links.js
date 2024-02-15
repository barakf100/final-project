import ROUTES from "../routes/ROUTES";

const links = {
    marryLinks: [
        { to: ROUTES.PROFILE, children: "Profile" },
        { to: ROUTES.SITORDER, children: "Sit Order" },
        { to: ROUTES.SITORDER2, children: "Sit List" },
        { to: ROUTES.INVITEPAGE, children: "Invites" },
        { to: ROUTES.MESSAGES, children: "Messages" },
        { to: ROUTES.INVITATION, children: "Invitation" },
    ],
    callerLinks: [{ to: ROUTES.CALLERPROFILE, children: "Profile" }],
    adminLinks: [{ to: ROUTES.USERS, children: "Users" }],
    alwaysLinks: [],
    logoutLinks: [
        { to: ROUTES.LOGIN, children: "Login" },
        { to: ROUTES.REGISTER, children: "Register" },
    ],
};

export default links;
