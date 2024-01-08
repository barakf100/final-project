import { ThemeProvider, createTheme } from "@mui/material/styles";
import Header from "./header/header";
import Main from "./main/main";
import { useDispatch, useSelector } from "react-redux";
import { darkThemeActions } from "../store/darkThemeSlice";
import tmc from "twin-moon-color";
import { Box } from "@mui/material";

const Layout = ({ children }) => {
    const isDarkTheme = useSelector((bigPie) => bigPie.darkThemeSlice.darkTheme);
    const dispatch = useDispatch();
    const themes = tmc({
        "text.headerColor": "!#464496",
        "text.headerActive": "!#ffffff",
        favActive: "*#FB0000",
    });
    const darkTheme = createTheme(themes.dark);
    const lightTheme = createTheme(themes.light);
    const handleThemeChange = (checked) => {
        dispatch(darkThemeActions.changeTheme());
    };
    return (
        <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
            <Box sx={{ height: "100vh", display: "flex" }}>
                <Header isDarkTheme={isDarkTheme} onThemeChange={handleThemeChange} />
                <Main>{children}</Main>
            </Box>
        </ThemeProvider>
    );
};
export default Layout;
