import { IconButton } from "@mui/material";
import { authActions } from "../../../store/authSlice";
import ROUTES from "../../../routes/ROUTES";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LogoutIcon from "@mui/icons-material/Logout";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
const LogoutAndThemeButton = ({ isDarkTheme, onThemeChange }) => {
    const loggedIn = useSelector((bigPie) => bigPie.authSlice.loggedIn);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogOut = () => {
        dispatch(authActions.logout());
        navigate(ROUTES.LOGIN);
    };
    return (
        <>
            <IconButton size="medium" color="inherit" sx={{ display: { cursor: "pointer" } }} onClick={onThemeChange}>
                {isDarkTheme ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
            {loggedIn && (
                <IconButton size="medium" aria-label="log out" color="inherit" onClick={handleLogOut}>
                    <LogoutIcon />
                </IconButton>
            )}
        </>
    );
};

export default LogoutAndThemeButton;
