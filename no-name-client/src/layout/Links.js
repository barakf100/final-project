import ROUTES from "../routes/ROUTES";

const links = {
    marryLinks: [
        { to: ROUTES.PROFILE, children: "Profile" },
        { to: ROUTES.INVITEPAGE, children: "Invites" },
        { to: ROUTES.MESSAGES, children: "Messages" },
        { to: ROUTES.INVITATION, children: "Invitation" },
    ],
    callerLinks: [
        { to: ROUTES.CALLERPROFILE, children: "Profile" },
        { to: ROUTES.WEDDINGCALENDER, children: "Wedding Calendar" },
    ],
    adminLinks: [
        { to: ROUTES.USERS, children: "Users" },
        { to: ROUTES.WEDDINGCALENDER, children: "Wedding Calender" },
    ],
    alwaysLinks: [],
    logoutLinks: [
        { to: ROUTES.LOGIN, children: "Login" },
        { to: ROUTES.REGISTER, children: "Register" },
    ],
};

export default links;
