import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
const Main = ({ children }) => {
    const theme = useTheme();
    return (
        <Box sx={{ pt: "100px", width: "100vw", backgroundColor: theme.palette.background.default }}>
            <Typography sx={{ color: theme.palette.text.primary }}>{children}</Typography>
        </Box>
    );
};

export default Main;
