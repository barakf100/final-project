import { Box, Drawer, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
// import { adminLinks, alwaysLinks, loggedInLinks, loggedOutLinks } from "../../myLinks";
// import NavLinkComponent from "../NavLinkComponent";
import nextKey from "generate-my-key";
import FilterComponent from "./FilterComponent";

const LeftDrawerComponent = ({ isOpen, onCloseDrawer }) => {
    const loggedIn = useSelector((bigPie) => bigPie.authSlice.loggedIn);
    const admin = useSelector((bigPie) => bigPie.authSlice.isAdmin);
    const screenSize = useMediaQuery("(max-width:700px)");
    // const list = () => (
    // <Box sx={{ width: { auto: 250 } }} role="presentation" onClick={onCloseDrawer} onKeyDown={onCloseDrawer}>
    //     {alwaysLinks.map((myItem) => (
    //         <NavLinkComponent to={myItem.to} key={nextKey()} from={"drawer"}>
    //             {myItem.children}
    //         </NavLinkComponent>
    //     ))}
    //     {loggedIn &&
    //         !admin &&
    //         loggedInLinks.map((myItem) => (
    //             <NavLinkComponent to={myItem.to} key={nextKey()} from={"drawer"}>
    //                 {myItem.children}
    //             </NavLinkComponent>
    //         ))}
    //     {!loggedIn &&
    //         loggedOutLinks.map((myItem) => (
    //             <NavLinkComponent to={myItem.to} key={nextKey()} from={"drawer"}>
    //                 {myItem.children}
    //             </NavLinkComponent>
    //         ))}
    //     {admin &&
    //         adminLinks.map((myItem) => (
    //             <NavLinkComponent to={myItem.to} key={nextKey()} from={"drawer"}>
    //                 {myItem.children}
    //             </NavLinkComponent>
    //         ))}
    // </Box>
    // );
    return (
        <Drawer sx={{ mt: 2 }} anchor="left" open={isOpen} onClose={onCloseDrawer}>
            {screenSize && <FilterComponent />}
            {/* {list()} */}
        </Drawer>
    );
};

export default LeftDrawerComponent;
