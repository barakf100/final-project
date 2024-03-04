import { Box, AppBar, Toolbar, Typography, useMediaQuery } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import Links from "./ui/Links.jsx";
import LeftDrawerComponent from "./ui/LeftDrawerComponent.jsx";
import ROUTES from "../../routes/ROUTES.js";
import { useNavigate } from "react-router-dom";
import LogoutAndThemeButton from "./ui/buttons.jsx";
const Header = ({ isDarkTheme, onThemeChange }) => {
    const linksScreenSize = useMediaQuery("(min-width:750px)");
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

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
    return (
        <Box sx={{ flexGrow: 1, mb: 2, position: "fixed", zIndex: 999, width: "100%" }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2, display: linksScreenSize ? "none" : "block" }}
                        onClick={handleOpenDrawerClick}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h4" noWrap component="div" sx={{ cursor: "pointer" }} onClick={handleHome}>
                        Marry.me
                    </Typography>
                    {linksScreenSize && <Links />}
                    <Box>{linksScreenSize && <LogoutAndThemeButton isDarkTheme={isDarkTheme} onThemeChange={handleThemeChange} />}</Box>
                </Toolbar>
            </AppBar>
            <LeftDrawerComponent
                isOpen={isOpen}
                onCloseDrawer={handleCloseDrawerClick}
                handleThemeChange={handleThemeChange}
                isDarkTheme={isDarkTheme}
            />
        </Box>
    );
};

export default Header;
