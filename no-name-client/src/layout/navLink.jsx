import { NavLink } from "react-router-dom";
import { Typography } from "@mui/material";
import { handleColorPallet } from "../service/colors/change";
const NavLinks = ({ to, children }) => {
    return (
        <NavLink style={{ textDecoration: "none" }} to={to}>
            <Typography color={handleColorPallet("mossGreen2")} sx={{ p: 2, mt: 2 }} variant="h6">
                {<span style={{ marginRight: "8px", fontSize: "1.2rem" }}>{children}</span>}
            </Typography>
        </NavLink>
    );
};

export default NavLinks;
