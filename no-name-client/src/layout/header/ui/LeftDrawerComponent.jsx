import { Drawer, Box } from "@mui/material";
import Links from "./Links";
import LogoutAndThemeButton from "./buttons";

const LeftDrawerComponent = ({ isOpen, onCloseDrawer, isDarkTheme, handleThemeChange }) => {
    return (
        <Drawer sx={{ mt: 2 }} anchor="left" open={isOpen} onClose={onCloseDrawer}>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <LogoutAndThemeButton isDarkTheme={isDarkTheme} onThemeChange={handleThemeChange} />
            </Box>
            {<Links from="drawer" />}
        </Drawer>
    );
};

export default LeftDrawerComponent;
