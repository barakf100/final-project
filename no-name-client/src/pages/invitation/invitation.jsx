import * as Mui from "@mui/material";
import CarouselComponent from "./ui/carousel";
import InputFileUpload from "./ui/uplaodButtonComp";
import invitationReq from "../../service/request/invitationReq";
import { getMyId } from "../../service/storage/storageService";
import { useEffect, useState } from "react";
import noImage from "../../assets/noImage.jpeg";

const Invitation = () => {
    const screenBreak = Mui.useMediaQuery("(min-width:1200px)");
    const screenBreakMobile = Mui.useMediaQuery("(min-width:600px)");
    const userId = getMyId();
    const [invitation, setInvitation] = useState(null);
    const [reload, setReload] = useState(false);
    const imageUrl = `${process.env.REACT_APP_SERVER_URL}image/${userId}`;
    useEffect(() => {
        const fetchInvitation = async () => {
            try {
                const res = await invitationReq.getInvitation(userId);
                setInvitation(res);
            } catch (err) {
                console.error(err);
            }
        };
        fetchInvitation();
    }, [userId, reload]);
    return (
        <Mui.Box>
            <Mui.Typography textAlign="center" variant="h4" gutterBottom>
                invitation
            </Mui.Typography>
            <Mui.Box sx={{ display: "flex", gap: "2vw", mx: 2, flexDirection: screenBreak ? "row" : "column-reverse" }}>
                <Mui.Box flex={0.7} height="72vh" textAlign="center">
                    <CarouselComponent screenBreak={screenBreak} />
                </Mui.Box>
                <Mui.Box flex={1} sx={{ height: "72vh", display: "flex", justifyContent: "space-around" }}>
                    <Mui.Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-around" }}>
                        <Mui.Box>
                            <Mui.Typography variant="h6" textAlign="center">
                                Instructions
                            </Mui.Typography>
                            <Mui.Typography variant="body1" lineHeight="3">
                                1. Choose from the templates.
                                <br />
                                2. edit it on canva.
                                <br />
                                3. or bring your own design.
                                <br />
                                4. Upload the image here.
                            </Mui.Typography>
                        </Mui.Box>
                        <Mui.Box sx={{ alignSelf: "center" }}>
                            <InputFileUpload setReload={setReload} invitation={invitation} />
                        </Mui.Box>
                    </Mui.Box>
                    <Mui.Box sx={{ width: screenBreakMobile ? "50%" : "75%", height: "72vh" }}>
                        <img
                            src={invitation ? `data:${invitation?.contentType};base64,${invitation}` : noImage}
                            alt="User Invitation"
                            height="100%"
                            width="100%"
                            style={{ border: "0.5px solid" }}
                        />
                    </Mui.Box>
                </Mui.Box>
            </Mui.Box>
        </Mui.Box>
    );
};

export default Invitation;
