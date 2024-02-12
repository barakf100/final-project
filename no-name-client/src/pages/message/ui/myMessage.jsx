import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import { handleColorPallet } from "../../../service/colors/change";
import messageReq from "../../../service/request/messageReq";
const MyMessage = ({ h, message, userId, type, setReload }) => {
    //TODO: no reload after delete
    const handleDelete = (message) => {
        const res = messageReq.deleteMessage(userId, type);
        setReload((prev) => !prev);
    };
    return (
        <Mui.Box>
            <Mui.Typography variant="h5" ml={3} textAlign="left" sx={{ color: handleColorPallet("mossGreen3") }}>
                {h}
            </Mui.Typography>
            <Mui.Typography variant="body2" ml={3} textAlign="left">
                {message ? message.message : "No messages yet."}
            </Mui.Typography>
            {message && (
                <Mui.Box ml={3} sx={{ display: "flex", width: "8vw", justifyContent: "space-between", mt: 1 }}>
                    <Mui.Button sx={{ color: handleColorPallet("teaGreen") }}>
                        <MuiIcons.Edit />
                    </Mui.Button>
                    <Mui.Button
                        onClick={() => {
                            handleDelete(message);
                        }}
                        sx={{ color: handleColorPallet("teaGreen") }}>
                        <MuiIcons.Delete />
                    </Mui.Button>
                </Mui.Box>
            )}
        </Mui.Box>
    );
};

export default MyMessage;
