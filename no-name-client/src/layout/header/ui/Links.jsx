import { Box } from "@mui/material";
import nextKey from "generate-my-key";
// import { adminLinks, alwaysLinks, loggedInLinks, loggedOutLinks } from "../../myLinks";
// import NavLinkComponent from "../NavLinkComponent";
import { useSelector } from "react-redux";

const Links = () => {
    const loggedIn = useSelector((bigPie) => bigPie.authSlice.loggedIn);
    const admin = useSelector((bigPie) => bigPie.authSlice.isAdmin);
    return (
        <></>
        // <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "flex" } }}>
        //     {alwaysLinks.map((myItem) => (
        //         <NavLinkComponent to={myItem.to} key={nextKey()} icon={myItem.icon} from={"header"}>
        //             {myItem.children}
        //         </NavLinkComponent>
        //     ))}
        //     {loggedIn &&
        //         !admin &&
        //         loggedInLinks.map((myItem) => (
        //             <NavLinkComponent to={myItem.to} key={nextKey()} icon={myItem.icon} from={"header"}>
        //                 {myItem.children}
        //             </NavLinkComponent>
        //         ))}
        //     {!loggedIn &&
        //         loggedOutLinks.map((myItem) => (
        //             <NavLinkComponent to={myItem.to} key={nextKey()} icon={myItem.icon} from={"header"}>
        //                 {myItem.children}
        //             </NavLinkComponent>
        //         ))}
        //     {admin &&
        //         adminLinks.map((myItem) => (
        //             <NavLinkComponent to={myItem.to} key={nextKey()} icon={myItem.icon} from={"header"}>
        //                 {myItem.children}
        //             </NavLinkComponent>
        //         ))}
        // </Box>
    );
};

export default Links;
