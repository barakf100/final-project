import { useState } from "react";
import * as Mui from "@mui/material";
import { handleColorPallet } from "../../service/colors/change";

const AboutComp = ({ image, text }) => {
    const teaGreen = handleColorPallet("teaGreen");
    const [page, setPage] = useState(0);
    const [texts] = useState(text);
    const [images] = useState(image);
    const handleNext = () => {
        if (page === images.length - 1) {
            setPage(0);
        } else {
            setPage(page + 1);
        }
    };
    return (
        <>
            <Mui.Typography mb={1} variant="body1">
                {texts[page]}
            </Mui.Typography>
            <Mui.Box sx={{ height: "58vh", display: "flex", justifyContent: "center", border: `.8px solid`, borderColor: teaGreen }}>
                <img src={images[page]} alt="marry messages" height="100%" />
            </Mui.Box>
            <Mui.Button onClick={handleNext} sx={{ color: handleColorPallet("mossGreen3") }}>
                next
            </Mui.Button>
        </>
    );
};

export default AboutComp;
