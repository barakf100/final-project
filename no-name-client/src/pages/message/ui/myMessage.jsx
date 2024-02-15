import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import { handleColorPallet } from "../../../service/colors/change";
import messageReq from "../../../service/request/messageReq";
import { useEffect, useState } from "react";
const MyMessage = ({ h, message, userId, type, setReload }) => {
    const [edit, setEdit] = useState(false);
    const [editMessage, setEditMessage] = useState(false);
    const [customMessage, setCustomMessage] = useState({
        before: "",
        dayBefore: "",
        after: "",
    });
    useEffect(() => {
        setCustomMessage({ type: message?.message });
    }, [message?.message]);
    const handleDelete = (message) => {
        messageReq
            .deleteMessage(userId, type)
            .then(setReload((prev) => !prev))
            .catch((err) => console.log(err));
    };
    const handleEditClick = () => {
        setEdit((prev) => !prev);
    };
    const handleSaveClick = (from, what) => {
        if (from === "customMessage") setEdit((prev) => !prev);
        else if (from === "editMessage") setEditMessage((prev) => !prev);
        if (customMessage.type && what === "postMessage") messageReq.postMessage(customMessage.type, userId, type);
        else if (customMessage.type && what === "updateMessage") messageReq.updateMessage(userId, type, customMessage.type);
        setReload((prev) => !prev);
    };
    const handleChange = (e, type) => {
        setCustomMessage({ type: e.target.value });
    };
    const handleEditMessage = () => {
        setEditMessage((prev) => !prev);
    };
    return (
        <Mui.Box sx={{ display: "flex", flexDirection: "column" }}>
            <Mui.Typography variant="h5" ml={3} textAlign="left" sx={{ color: handleColorPallet("mossGreen3") }}>
                {h}
            </Mui.Typography>
            <Mui.Typography variant="body2" ml={3} textAlign="left">
                {!edit ? (
                    message ? (
                        editMessage ? (
                            <Mui.TextField sx={{ width: "25vw" }} multiline value={customMessage.type} onChange={handleChange} />
                        ) : (
                            message.message
                        )
                    ) : (
                        "No messages yet."
                    )
                ) : (
                    <Mui.TextField sx={{ width: "25vw" }} multiline onChange={(e, type) => handleChange(e, type)} />
                )}
            </Mui.Typography>
            {message ? (
                <Mui.Box ml={3} sx={{ display: "flex", width: "8vw", justifyContent: "space-between", mt: 1 }}>
                    <Mui.Button sx={{ color: handleColorPallet("teaGreen") }}>
                        {editMessage ? (
                            <MuiIcons.Save onClick={() => handleSaveClick("editMessage", "updateMessage")} />
                        ) : (
                            <MuiIcons.Edit onClick={handleEditMessage} />
                        )}
                    </Mui.Button>
                    <Mui.Button
                        onClick={() => {
                            handleDelete(message);
                        }}
                        sx={{ color: handleColorPallet("teaGreen") }}>
                        <MuiIcons.Delete />
                    </Mui.Button>
                </Mui.Box>
            ) : edit ? (
                <Mui.Button
                    onClick={() => handleSaveClick("customMessage", "postMessage")}
                    sx={{ color: handleColorPallet("teaGreen"), alignSelf: "flex-start", ml: 3, pl: 0 }}>
                    Save
                </Mui.Button>
            ) : (
                <Mui.Button onClick={handleEditClick} sx={{ color: handleColorPallet("teaGreen"), alignSelf: "flex-start", ml: 3, pl: 0 }}>
                    Custom message
                </Mui.Button>
            )}
        </Mui.Box>
    );
};

export default MyMessage;
