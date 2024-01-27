import ROUTES from "../routes/ROUTES";

const links = {
    marryLinks: [{ to: ROUTES.PROFILE, children: "Profile" }],
    callerLinks: [{ to: ROUTES.USERS, children: "Users" }],
    adminLinks: [{ to: ROUTES.USERS, children: "Users" }],
    alwaysLinks: [],
};

export default links;
