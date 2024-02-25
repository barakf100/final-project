import { Box, AppBar, Toolbar, Typography, useMediaQuery } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useState } from "react";
import Links from "./ui/Links.jsx";
import LeftDrawerComponent from "./ui/LeftDrawerComponent.jsx";
import ROUTES from "../../routes/ROUTES.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice.js";
const Header = ({ isDarkTheme, onThemeChange }) => {
    const linksScreenSize = useMediaQuery("(min-width:500px)");
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleThemeChange = (event) => {
        onThemeChange(event.target.checked);
    };

    const handleOpenDrawerClick = () => {
        setIsOpen(true);
    };
    const handleCloseDrawerClick = () => {
        setIsOpen(false);
    };
    const handleHome = () => {
        navigate(ROUTES.HOME);
    };
    const handleLogOut = () => {
        dispatch(authActions.logout());
        navigate(ROUTES.LOGIN);
    };
    return (
        <Box sx={{ flexGrow: 1, mb: 2, position: "fixed", zIndex: 999, width: "100%" }}>
            <AppBar position="static" color="">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2, display: { xs: "block", sm: "none", md: "none", lg: "none" } }}
                        onClick={handleOpenDrawerClick}>
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h4"
                        noWrap
                        component="div"
                        sx={{ display: { xs: "none", sm: "none", md: "block" }, cursor: "pointer" }}
                        onClick={handleHome}>
                        Marry.me
                    </Typography>
                    {linksScreenSize && <Links />}
                    <Box>
                        <IconButton size="medium" color="inherit" sx={{ display: { cursor: "pointer" } }} onClick={handleThemeChange}>
                            {isDarkTheme ? <DarkModeIcon /> : <LightModeIcon />}
                        </IconButton>
                        <IconButton size="medium" aria-label="log out" color="inherit" onClick={handleLogOut}>
                            <LogoutIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <LeftDrawerComponent isOpen={isOpen} onCloseDrawer={handleCloseDrawerClick} />
        </Box>
    );
};

export default Header;
