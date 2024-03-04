import * as React from "react";
import * as Mui from "@mui/material";
import PropTypes from "prop-types";
import clsx from "clsx";
import { styled, css } from "@mui/system";
import { Modal as BaseModal } from "@mui/base/Modal";
import { handleColorPallet } from "../../../service/colors/change";

const MessagesPop = ({ open, setOpen, invitationMessage, phoneNumber }) => {
    const handleClose = () => setOpen(false);
    const handleSendMEssage = (message, phoneNumber) => {
        window.open(`https://wa.me/+972${phoneNumber}?text=${message}`);
        handleClose();
    };
    return (
        <div>
            <Modal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={open}
                onClose={handleClose}
                slots={{ backdrop: StyledBackdrop }}>
                <ModalContent sx={{ width: 600 }}>
                    <Mui.Typography variant="h5" textAlign="center" fontWeight="bold">
                        Messages
                    </Mui.Typography>
                    <Mui.Grid container spacing={1}>
                        <Mui.Grid item xs={4} borderRadius={5} p={1} sx={{ display: "flex", flexDirection: "column" }}>
                            <Mui.Typography variant="h6" fontWeight="bold">
                                Week before
                            </Mui.Typography>
                            {invitationMessage.before ? invitationMessage.before.message : "not set yet by user"}
                            <Mui.Button
                                disabled={!invitationMessage.before}
                                onClick={() => {
                                    handleSendMEssage(invitationMessage.before.message, phoneNumber);
                                }}
                                sx={{ marginTop: "auto", color: handleColorPallet("mossGreen2") }}>
                                send
                            </Mui.Button>
                        </Mui.Grid>
                        <Mui.Grid item xs={4} borderRadius={5} p={1} sx={{ display: "flex", flexDirection: "column" }}>
                            <Mui.Typography variant="h6" fontWeight="bold">
                                Day before
                            </Mui.Typography>
                            {invitationMessage.dayBefore ? invitationMessage.dayBefore.message : "not set yet by user"}
                            <Mui.Button
                                disabled={!invitationMessage.dayBefore}
                                onClick={() => {
                                    handleSendMEssage(invitationMessage.dayBefore.message, phoneNumber);
                                }}
                                sx={{ marginTop: "auto", color: handleColorPallet("mossGreen2") }}>
                                send
                            </Mui.Button>
                        </Mui.Grid>
                        <Mui.Grid item xs={4} borderRadius={5} p={1} sx={{ display: "flex", flexDirection: "column" }}>
                            <Mui.Typography variant="h6" fontWeight="bold">
                                After
                            </Mui.Typography>
                            {invitationMessage.after ? invitationMessage.after.message : "not set yet by user"}
                            <Mui.Button
                                disabled={!invitationMessage.after}
                                onClick={() => {
                                    handleSendMEssage(invitationMessage.after.message, phoneNumber);
                                }}
                                sx={{ marginTop: "auto", color: handleColorPallet("mossGreen2") }}>
                                send
                            </Mui.Button>
                        </Mui.Grid>
                    </Mui.Grid>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default MessagesPop;

const Backdrop = React.forwardRef((props, ref) => {
    const { open, className, ...other } = props;
    return <div className={clsx({ "base-Backdrop-open": open }, className)} ref={ref} {...other} />;
});

Backdrop.propTypes = {
    className: PropTypes.string.isRequired,
    open: PropTypes.bool,
};

const grey = {
    50: "#F3F6F9",
    100: "#E5EAF2",
    200: "#DAE2ED",
    300: "#C7D0DD",
    400: "#B0B8C4",
    500: "#9DA8B7",
    600: "#6B7A90",
    700: "#434D5B",
    800: "#303740",
    900: "#1C2025",
};

const Modal = styled(BaseModal)`
    position: fixed;
    z-index: 1300;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
    z-index: -1;
    position: fixed;
    inset: 0;
    background-color: transparent;
    -webkit-tap-highlight-color: transparent;
`;

const ModalContent = styled("div")(
    ({ theme }) => css`
        font-family: "IBM Plex Sans", sans-serif;
        font-weight: 500;
        text-align: start;
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 8px;
        overflow: hidden;
        background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
        border-radius: 8px;
        box-shadow: 0 4px 12px ${theme.palette.mode === "dark" ? "rgb(0 0 0 / 0.5)" : "rgb(0 0 0 / 0.2)"};
        padding: 24px;
        color: ${theme.palette.mode === "dark" ? grey[50] : grey[900]};
    `
);
