import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import MessageComp from "./ui/messageComp";
import message from "./ui/message";
import { useEffect, useState } from "react";
import { handleColorPallet } from "../../service/colors/change";
import MyMessage from "./ui/myMessage";
import messageReq from "../../service/request/messageReq";
import { getMyId } from "../../service/storage/storageService";

const Messages = () => {
    const [optionBefore, setOptionBefore] = useState([]);
    const [pageBefore, setPageBefore] = useState(0);
    const [optionDayBefore, setOptionDayBefore] = useState([]);
    const [pageDayBefore, setPageDayBefore] = useState(0);
    const [optionAfter, setOptionAfter] = useState([]);
    const [pageAfter, setPageAfter] = useState(0);
    const [userMessage, setUserMessage] = useState(null);
    const [reload, setReload] = useState(false);
    const [toClick, setToClick] = useState({ before: true, dayBefore: false, after: false });
    const userId = getMyId();
    useEffect(() => {
        setOptionBefore([message.before.Option1, message.before.Option2, message.before.Option3]);
        setOptionDayBefore([message.dayBefore.Option1, message.dayBefore.Option2, message.dayBefore.Option3]);
        setOptionAfter([message.after.Option1, message.after.Option2, message.after.Option3]);
    }, []);
    useEffect(() => {
        const fetch = async () => {
            const res = await messageReq.getMessages(userId);
            setUserMessage(res);
        };
        fetch();
    }, [userId, reload]);
    return (
        <Mui.Box sx={{ textAlign: "center", px: 2 }}>
            <Mui.Typography variant="h4" sx={{ color: handleColorPallet("mossGreen3") }}>
                Messages
            </Mui.Typography>
            <Mui.Box sx={{ mt: 2, width: "100%", display: "flex", gap: "1.5vw" }}>
                <Mui.Box
                    sx={{
                        mt: 2,
                        height: "70vh",
                        width: "65vw",
                        border: "1px solid",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-evenly",
                    }}>
                    <Mui.Typography variant="h5" sx={{ color: handleColorPallet("mossGreen3") }}>
                        Templates
                    </Mui.Typography>
                    <Mui.Box sx={{ display: "flex" }}>
                        <MessageComp
                            round={"Before"}
                            id={"before"}
                            option={optionBefore}
                            page={pageBefore}
                            setPage={setPageBefore}
                            toClick={toClick.before}
                            setToClick={setToClick}
                            setReload={setReload}
                        />
                        <MessageComp
                            round={"Day before"}
                            id={"dayBefore"}
                            option={optionDayBefore}
                            page={pageDayBefore}
                            setPage={setPageDayBefore}
                            toClick={toClick.dayBefore}
                            setToClick={setToClick}
                            setReload={setReload}
                        />
                        <MessageComp
                            round={"After"}
                            id={"after"}
                            option={optionAfter}
                            page={pageAfter}
                            setPage={setPageAfter}
                            toClick={toClick.after}
                            setToClick={setToClick}
                            setReload={setReload}
                        />
                    </Mui.Box>
                </Mui.Box>
                <Mui.Box
                    sx={{
                        mt: 2,
                        height: "70vh",
                        width: "45vw",
                        border: "1px solid",
                        display: "flex",
                        flexDirection: "column",
                    }}>
                    <Mui.Typography variant="h5" sx={{ color: handleColorPallet("mossGreen3") }}>
                        You're messages
                    </Mui.Typography>
                    <Mui.Box sx={{ height: "65vh", display: "flex", flexDirection: "column", justifyContent: "space-evenly" }}>
                        {userMessage && (
                            <MyMessage userId={userId} h={"Before"} message={userMessage.before} type="before" setReload={setReload} />
                        )}
                        {userMessage && (
                            <MyMessage
                                userId={userId}
                                h={"Day before"}
                                message={userMessage.dayBefore}
                                type="dayBefore"
                                setReload={setReload}
                            />
                        )}
                        {userMessage && (
                            <MyMessage userId={userId} h={"After"} message={userMessage.after} type="after" setReload={setReload} />
                        )}
                    </Mui.Box>
                </Mui.Box>
            </Mui.Box>
        </Mui.Box>
    );
};

export default Messages;
