import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import { handleColorPallet } from "../../../service/colors/change";
import { getMyId } from "../../../service/storage/storageService";
import messageReq from "../../../service/request/messageReq";
const MessageComp = ({ round, option, page, setPage, id, setReload }) => {
    const screenBreak = Mui.useMediaQuery("(min-width:1100px)");
    const messageBreak = Mui.useMediaQuery("(min-width:800px)");
    const userId = getMyId();
    const handleChangeOption = (setFunc, direction) => {
        setFunc((prevPage) => {
            if (direction === "forward") {
                return (prevPage + 1) % option.length;
            } else if (direction === "back") {
                return (prevPage - 1 + option.length) % option.length;
            } else {
                return prevPage;
            }
        });
    };
    const handleMessageChoose = async (message, type) => {
        await messageReq.postMessage(message, userId, type);
        setReload((prev) => !prev);
    };
    return (
        <Mui.Box
            sx={{
                m: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: screenBreak ? "18vw" : messageBreak ? "28vw" : "75vw",
                height: "55vh",
                border: "1.6px solid beige",
            }}>
            <Mui.CardContent>
                <Mui.Typography variant="h5" color="text.secondary">
                    {round}
                </Mui.Typography>
                <Mui.Typography variant="h7" component="div">
                    option {page + 1}
                </Mui.Typography>
                <Mui.Box sx={{ display: "flex", justifyContent: "space-between", height: "28vh", overflow: "scroll" }}>
                    <MuiIcons.ArrowBackIos
                        onClick={() => {
                            handleChangeOption(setPage, "back");
                        }}
                        sx={{ mr: 2, color: handleColorPallet("teaGreen"), alignSelf: "center", cursor: "pointer" }}
                    />
                    <Mui.Typography variant="body2" textAlign="left">
                        {option[page]}
                    </Mui.Typography>
                    <MuiIcons.ArrowForwardIos
                        onClick={() => {
                            handleChangeOption(setPage, "forward");
                        }}
                        sx={{ ml: 2, color: handleColorPallet("teaGreen"), alignSelf: "center", cursor: "pointer" }}
                    />
                </Mui.Box>
            </Mui.CardContent>
            <Mui.CardActions>
                <Mui.Button
                    size="small"
                    color="mossGreen1"
                    sx={{ alignSelf: "end" }}
                    onClick={() => {
                        handleMessageChoose(option[page], id);
                    }}>
                    choose
                </Mui.Button>
            </Mui.CardActions>
        </Mui.Box>
    );
};

export default MessageComp;
