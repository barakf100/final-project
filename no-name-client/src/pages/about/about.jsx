import * as Mui from "@mui/material";
import { handleColorPallet } from "../../service/colors/change";
import { useState } from "react";
import AllAbout from "./allAbout";
import AboutComp from "./marryAbout";
import MarryHome from "../../assets/marryHomePage.png";
import marryInvite from "../../assets/marryInvites.png";
import MarryInvitation from "../../assets/marryInvitation.png";
import marryMessages from "../../assets/marryMessages.png";
import callerHome from "../../assets/callerHome.png";
import callerInvites from "../../assets/callerInvites.png";
import callerCalendar from "../../assets/callerCalender.png";
import {
    callerHomeText,
    callerInvitesText,
    callerWeddingCalendarText,
    marryHomeText,
    marryInvitationText,
    marryInviteText,
    marryMessagesText,
} from "./ui/texts";
const About = () => {
    const [type, setType] = useState("All");
    const marryImages = [MarryHome, marryInvite, marryMessages, MarryInvitation];
    const marryText = [marryHomeText, marryInviteText, marryMessagesText, marryInvitationText];
    const callerImages = [callerHome, callerInvites, callerCalendar];
    const callerText = [callerHomeText, callerInvitesText, callerWeddingCalendarText];
    return (
        <Mui.Container sx={{ display: "flex", flexDirection: "column", height: "85.8vh" }}>
            <Mui.Typography variant="h3" fontWeight="bold" color={handleColorPallet("teaGreen")} align="center">
                About
            </Mui.Typography>
            {type === "All" && <AllAbout />}
            {type === "Marry" && <AboutComp image={marryImages} text={marryText} />}
            {type === "Caller" && <AboutComp image={callerImages} text={callerText} />}
            <Mui.Box alignSelf="center" mt="auto">
                <Mui.Button size="large" sx={{ color: handleColorPallet("teaGreen") }} onClick={() => setType("All")}>
                    All
                </Mui.Button>
                <Mui.Button size="large" sx={{ color: handleColorPallet("teaGreen") }} onClick={() => setType("Marry")}>
                    Marry
                </Mui.Button>
                <Mui.Button size="large" sx={{ color: handleColorPallet("teaGreen") }} onClick={() => setType("Caller")}>
                    Caller
                </Mui.Button>
            </Mui.Box>
        </Mui.Container>
    );
};

export default About;
