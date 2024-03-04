import { TableContainer, TableHead, TableRow, TableCell, Table, TableBody, Paper, Typography, Box, Button } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useLocation } from "react-router-dom";
import { updateArrival } from "../../service/request/callerReq";
import { useEffect, useState } from "react";
import { getUserById } from "../../service/request/marryReq";
import InvitePaginate from "./ui/invitesPaginate";
const UserInvites = () => {
    const screenSizeWidth = useMediaQuery("(min-width:550px)");
    const location = useLocation();
    const userId = location.state.id;
    const ITEM_PER_PAGE = screenSizeWidth ? 4 : 5;
    const name = `${location.state.nameA} & ${location.state.nameB ? location.state.nameB : "not set yet"}`;
    const [invitesArr, setInvitesArr] = useState(null);
    const [message, setMessage] = useState(null);
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [selectedPhoneNumber, setSelectedPhoneNumber] = useState(null);
    useEffect(() => {
        const fetchInvites = async () => {
            const { user } = await getUserById(userId);
            const { invites } = user;
            const { invitationMessage } = user;
            setMessage(invitationMessage);
            setInvitesArr(invites);
        };
        fetchInvites();
    }, [userId]);
    const handleChange = async (event, inviteId) => {
        const update = {
            isAccepted: false,
            isDeclined: false,
            isPending: false,
        };
        const value = event.target.value;
        if (value === "accept") {
            update.isAccepted = true;
        } else if (value === "declined") {
            update.isDeclined = true;
        } else {
            update.isPending = true;
        }
        const updatedInvites = await updateArrival(userId, inviteId, update);
        setInvitesArr(updatedInvites.invites);
    };
    const handleNextPage = () => {
        if ((page + 1) * ITEM_PER_PAGE < invitesArr.length) {
            setPage(page + 1);
        }
    };
    const handlePreviousPage = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };
    return (
        <TableContainer
            component={Paper}
            sx={{
                backgroundColor: (theme) => theme.palette.background.default,
                "& .MuiTableRow-root": {
                    border: "1.2px",
                    borderColor: "beige.main",
                    borderStyle: "solid",
                },
                "& .MuiTableRow-root:last-child": {
                    border: "1.2px",
                    borderColor: "beige.main",
                    borderStyle: "solid",
                },
                overflow: "hidden",
                boxShadow: "none",
            }}>
            <Typography variant={screenSizeWidth ? "h2" : "h4"} sx={{ textAlign: "center" }}>
                {name}-invites
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">First</TableCell>
                        <TableCell align="center">Last</TableCell>
                        <TableCell align="center">Phone</TableCell>
                        <TableCell align="center">Arrival</TableCell>
                        <TableCell align="left">Message</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <InvitePaginate
                        ITEM_PER_PAGE={ITEM_PER_PAGE}
                        handleChange={handleChange}
                        invites={invitesArr}
                        message={message}
                        open={open}
                        page={page}
                        selectedPhoneNumber={selectedPhoneNumber}
                        setOpen={setOpen}
                        setSelectedPhoneNumber={setSelectedPhoneNumber}
                    />
                </TableBody>
            </Table>
            <Box sx={{ display: "flex", justifyContent: "center", margin: "0 auto", position: "absolute", bottom: 10, left: "45%" }}>
                <Button sx={{ height: "30px" }} color="mossGreen1" onClick={handlePreviousPage}>
                    Previous
                </Button>
                <Button sx={{ height: "30px" }} color="mossGreen1" onClick={handleNextPage}>
                    Next
                </Button>
            </Box>
        </TableContainer>
    );
};

export default UserInvites;
