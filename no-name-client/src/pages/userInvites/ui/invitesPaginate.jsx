import { TableRow, TableCell, ToggleButtonGroup, ToggleButton, useMediaQuery } from "@mui/material";
import { WhatsappIcon } from "react-share";
import MessagesPop from "./messagesPop";

const InvitePaginate = ({
    invites,
    handleChange,
    setOpen,
    setSelectedPhoneNumber,
    open,
    message,
    selectedPhoneNumber,
    page,
    ITEM_PER_PAGE,
}) => {
    const screenSize = useMediaQuery("(min-width:550px)");
    const PaginateInvites = invites?.slice(page * ITEM_PER_PAGE, (page + 1) * ITEM_PER_PAGE);
    return PaginateInvites?.map((invite) => (
        <TableRow key={invite._id}>
            <TableCell align="center">{invite.name.first}</TableCell>
            <TableCell align="center">{invite.name.last}</TableCell>
            <TableCell align="center">{invite.phone}</TableCell>
            <TableCell align="center">
                <ToggleButtonGroup
                    color="mossGreen1"
                    value={invite.isAccepted ? "accept" : invite.isDeclined ? "declined" : "pending"}
                    exclusive
                    onChange={(e) => {
                        handleChange(e, invite._id);
                    }}
                    sx={{ "& button": { fontSize: "1.12vw" } }}
                    aria-label="Platform">
                    <ToggleButton value="accept">accept</ToggleButton>
                    <ToggleButton value="pending">pending</ToggleButton>
                    <ToggleButton value="declined">declined</ToggleButton>
                </ToggleButtonGroup>
            </TableCell>
            <TableCell align="left" sx={{ pb: 0 }}>
                <WhatsappIcon
                    cursor="pointer"
                    size={screenSize ? 32 : 24}
                    round={true}
                    onClick={() => {
                        setOpen(true);
                        setSelectedPhoneNumber(invite.phone);
                    }}
                />
                <MessagesPop open={open} setOpen={setOpen} invitationMessage={message} phoneNumber={selectedPhoneNumber} />
            </TableCell>
        </TableRow>
    ));
};

export default InvitePaginate;
