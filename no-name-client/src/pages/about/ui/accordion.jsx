import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import { handleColorPallet } from "../../../service/colors/change";

const Accordion = ({ header, text, button }) => {
    return (
        <Mui.Accordion>
            <Mui.AccordionSummary expandIcon={<MuiIcons.ExpandMore />} aria-controls="panel1-content">
                <Mui.Typography variant="h6">{header}</Mui.Typography>
            </Mui.AccordionSummary>
            <Mui.AccordionDetails>
                <Mui.Typography variant="body1">{text}</Mui.Typography>
            </Mui.AccordionDetails>
            {button && (
                <Mui.AccordionActions>
                    <Mui.Button sx={{ color: handleColorPallet("teaGreen") }}>{header}</Mui.Button>
                </Mui.AccordionActions>
            )}
        </Mui.Accordion>
    );
};

export default Accordion;
