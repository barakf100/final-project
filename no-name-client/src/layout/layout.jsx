import { ThemeProvider, createTheme } from "@mui/material/styles";
import Header from "./header/header";
import Main from "./main/main";
import { useDispatch, useSelector } from "react-redux";
import { darkThemeActions } from "../store/darkThemeSlice";
import { Box } from "@mui/material";

const Layout = ({ children }) => {
    const isDarkTheme = useSelector((bigPie) => bigPie.darkThemeSlice.darkTheme);
    const dispatch = useDispatch();
    // const themes = tmc({
    //     "text.headerColor": "!#464496",
    //     "text.headerActive": "!#ffffff",
    //     favActive: "*#FB0000",
    // });
    const themes = createTheme({
        palette: {
            mode: isDarkTheme ? "dark" : "light",
            background: {
                default: isDarkTheme ? "#000000" : "#ffffff",
            },
            primary: {
                main: isDarkTheme ? "#0000ff" : "#f5e4ce",
                light: "#f5e4ce",
                dark: "#f5e4ce",
            },
            secondary: {
                main: "#f5e4ce",
                light: "#f5e4ce",
                dark: "#f5e4ce",
            },
        },
    });
    const handleThemeChange = (checked) => {
        dispatch(darkThemeActions.changeTheme());
    };
    return (
        <ThemeProvider theme={themes}>
            <Box sx={{ height: "100vh", display: "flex" }}>
                <Header isDarkTheme={isDarkTheme} onThemeChange={handleThemeChange} />
                <Main>{children}</Main>
            </Box>
        </ThemeProvider>
    );
};
export default Layout;
