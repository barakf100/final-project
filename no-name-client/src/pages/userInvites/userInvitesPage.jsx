import {
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    Table,
    TableBody,
    Paper,
    ToggleButtonGroup,
    ToggleButton,
    Typography,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { getAllInvites, updateArrival } from "../../service/request/callerReq";
import { useEffect, useState } from "react";
const UserInvites = () => {
    const location = useLocation();
    const userId = location.state.id;
    const name = `${location.state.nameA} & ${location.state.nameB ? location.state.nameB : "not set yet"}`;
    const [invitesArr, setInvitesArr] = useState(null);
    useEffect(() => {
        const fetchInvites = async () => {
            const { invites } = await getAllInvites(userId);
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
            <Typography variant="h2" sx={{ textAlign: "center" }}>
                {name}-invite List
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">First Name</TableCell>
                        <TableCell align="center">Last Name</TableCell>
                        <TableCell align="center">Phone</TableCell>
                        <TableCell align="center">Arrival</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {invitesArr?.map((invite) => (
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
                                    aria-label="Platform">
                                    <ToggleButton value="accept">accept</ToggleButton>
                                    <ToggleButton value="pending">pending</ToggleButton>
                                    <ToggleButton value="declined">declined</ToggleButton>
                                </ToggleButtonGroup>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UserInvites;
