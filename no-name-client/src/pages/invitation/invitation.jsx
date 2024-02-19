import * as Mui from "@mui/material";
import CarouselComponent from "./ui/carousel";
import InputFileUpload from "./ui/uplaodButtonComp";
import invitationReq from "../../service/request/invitationReq";
import { getMyId } from "../../service/storage/storageService";
import { useEffect, useState } from "react";
import noImage from "../../assets/noImage.jpeg";

const Invitation = () => {
    const userId = getMyId();
    const [invitation, setInvitation] = useState(null);
    const [reload, setReload] = useState(false);
    useEffect(() => {
        const fetchInvitation = async () => {
            try {
                const res = await invitationReq.getInvitation(userId);
                console.log(res);
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
            <Mui.Box sx={{ display: "flex", gap: "2vw", mx: 2 }}>
                <Mui.Box flex={0.7} height="75vh" textAlign="center">
                    <CarouselComponent />
                </Mui.Box>
                <Mui.Box flex={1} sx={{ display: "flex", justifyContent: "space-around" }}>
                    <Mui.Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                        <Mui.Box>
                            <Mui.Typography variant="h6" textAlign="center">
                                Instructions
                            </Mui.Typography>
                            <Mui.Typography variant="body1" lineHeight="3">
                                1. Choose from the templates.
                                <br />
                                2. and edit it on canva.
                                <br />
                                3. or bring your own design.
                                <br />
                                4. Upload the image here.
                            </Mui.Typography>
                        </Mui.Box>
                        <Mui.Box sx={{ alignSelf: "end" }}>
                            <InputFileUpload setReload={setReload} />
                        </Mui.Box>
                    </Mui.Box>
                    <Mui.Box sx={{ width: "50%" }}>
                        <img
                            src={invitation ? `data:${invitation?.contentType};base64,${invitation}` : noImage}
                            alt="User Invitation"
                            height="494px"
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
