import * as Mui from "@mui/material";
import CarouselComponent from "./ui/carousel";
import InputFileUpload from "./ui/uplaodButtonComp";
import invitationReq from "../../service/request/invitationReq";
import { getMyId } from "../../service/storage/storageService";
import { useEffect, useState } from "react";
const Invitation = () => {
    const userId = getMyId();
    const [invitation, setInvitation] = useState(null);
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
    }, [userId]);
    return (
        <Mui.Box>
            <Mui.Typography textAlign="center" variant="h4" gutterBottom>
                invitation
            </Mui.Typography>
            <Mui.Box sx={{ display: "flex", gap: "2vw", mx: 2 }}>
                <Mui.Box flex={0.7} height="75vh" textAlign="center">
                    <CarouselComponent />
                </Mui.Box>
                <Mui.Box flex={1} border="1px solid">
                    <Mui.Typography textAlign="center" variant="h5" gutterBottom>
                        Our invitation builder feature offers a carousel of beautifully crafted templates to choose from. Once you've found
                        the perfect design, simply click on it to customize further using Canva's intuitive editing tools. After
                        personalizing your invitation, upload your own image to replace the template, adding a unique touch to your wedding
                        invitation. It's a seamless process that allows you to create stunning invitations tailored to your special day.
                    </Mui.Typography>
                    <Mui.Box sx={{ width: "50%", border: "1px solid" }}>
                        <img
                            src={`data:${invitation.contentType};base64,${invitation}`}
                            alt="User Invitation"
                            height="500px"
                            width="100%"
                        />
                    </Mui.Box>
                    <InputFileUpload />
                </Mui.Box>
            </Mui.Box>
        </Mui.Box>
    );
};

export default Invitation;
