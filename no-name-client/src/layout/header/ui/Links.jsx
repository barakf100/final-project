import { Box } from "@mui/material";
import nextKey from "generate-my-key";
// import { adminLinks, alwaysLinks, loggedInLinks, loggedOutLinks } from "../../myLinks";
// import NavLinks from "../NavLinks";
import { useSelector } from "react-redux";
import NavLinks from "../../navLink";
import links from "../../Links";

const Links = () => {
    const loggedIn = useSelector((bigPie) => bigPie.authSlice.loggedIn);
    const admin = useSelector((bigPie) => bigPie.authSlice.isAdmin);
    const userType = useSelector((bigPie) => bigPie.authSlice.type);
    return (
        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "flex" } }}>
            {links.alwaysLinks.map((myItem) => (
                <NavLinks to={myItem.to} key={nextKey()} icon={myItem.icon} from={"header"}>
                    {myItem.children}
                </NavLinks>
            ))}
            {loggedIn &&
                userType === "marry" &&
                links.marryLinks.map((myItem) => (
                    <NavLinks to={myItem.to} key={nextKey()} icon={myItem.icon} from={"header"}>
                        {myItem.children}
                    </NavLinks>
                ))}
            {loggedIn &&
                userType === "caller" &&
                links.callerLinks.map((myItem) => (
                    <NavLinks to={myItem.to} key={nextKey()} icon={myItem.icon} from={"header"}>
                        {myItem.children}
                    </NavLinks>
                ))}
            {loggedIn &&
                userType === "admin" &&
                links.adminLinks.map((myItem) => (
                    <NavLinks to={myItem.to} key={nextKey()} icon={myItem.icon} from={"header"}>
                        {myItem.children}
                    </NavLinks>
                ))}
        </Box>
    );
};

export default Links;
