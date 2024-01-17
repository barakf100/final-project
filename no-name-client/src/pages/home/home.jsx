import { Typography, Box, Container, Button } from "@mui/material";
import "../../fonts.css";
import { useEffect, useState } from "react";
import { JWTDecode, getMyId, getToken } from "../../service/storage/storageService";
import { getUserById } from "../../service/request/marryReq";
import { MyProgressBar } from "../../components/progress";
import { handleColorPallet } from "../../service/colors/change";
import { addTDL, getAllTDLs } from "../../service/request/TDLReq";
import TDLPaginate from "./paginate/tdlPaginate";
import { splitInvitesByStatus } from "../../service/invites/invites";
import InviteStatusPaginate from "./paginate/inviteStatusPaginate";

const borderColor = (theme) => theme.palette.teaGreen.main;
const HomePage = () => {
    const [user, setUser] = useState(null);
    const [TDL, setTDL] = useState([]);
    const [inviteStatus, setInviteStatus] = useState(null);
    const [reload, setReload] = useState(false);
    const { _id } = JWTDecode(getToken());
    useEffect(() => {
        const fetchUser = async () => {
            const { user: usr } = await getUserById(_id);
            setUser(usr);
        };
        fetchUser();
    }, [_id]);
    useEffect(() => {
        if (user) {
            setInviteStatus(splitInvitesByStatus(user));
        }
    }, [user]);
    useEffect(() => {
        const id = getMyId();
        const fetchTDL = async () => {
            const tdl = await getAllTDLs(id);
            setTDL(tdl);
        };
        fetchTDL();
    }, [reload]);
    const handleReload = () => {
        setReload((prev) => !prev);
    };
    const handleAddTDL = async () => {
        const tdl = {
            name: "test1",
            description: "test",
        };
        try {
            await addTDL(getMyId(), tdl);
            handleReload();
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <Container maxWidth={"xl"}>
            <Typography variant="h3" textAlign="center" marginBottom="25px" fontFamily="Quattrocento sans">
                Welcome to the Home Page
            </Typography>
            <Box style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
                <Box
                    style={{
                        height: "210px",
                        gridRow: "1 / 3",
                        fontFamily: "Montserrat",
                        // backgroundImage: `url(${imageRing})`,
                        // backgroundPosition: "center",
                        // backgroundSize: "cover",
                        // backgroundRepeat: "no-repeat",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        fontSize: "1.3rem",
                        // color: "white",
                    }}>
                    Cheers to the beginning of your wonderful journey! Welcome to our wedding planning app—where dreams come true, one
                    detail at a time.
                </Box>
                {/* invites status */}
                <Box style={{ display: "flex", gap: "10px", height: "100px" }}>
                    <Box sx={{ flex: "1", border: `.9px solid`, borderColor: borderColor }}>
                        <Typography fontFamily="Quattrocento sans" fontSize="1rem" textAlign="center">
                            Declined
                        </Typography>
                        <Typography
                            sx={{ color: handleColorPallet("mossGreen1") }}
                            fontFamily="Quattrocento sans"
                            fontSize="3rem"
                            textAlign="center">
                            {inviteStatus?.declinedInvites.length}
                        </Typography>
                    </Box>
                    <Box sx={{ flex: "1", border: `.9px solid`, borderColor: borderColor }}>
                        <Typography fontFamily="Quattrocento sans" fontSize="1rem" textAlign="center">
                            Pending
                        </Typography>
                        <Typography
                            sx={{ color: handleColorPallet("beige") }}
                            fontFamily="Quattrocento sans"
                            fontSize="3rem"
                            textAlign="center">
                            {inviteStatus?.pendingInvites.length}
                        </Typography>
                    </Box>
                    <Box sx={{ flex: "1", border: `.9px solid`, borderColor: borderColor }}>
                        <Typography fontFamily="Quattrocento sans" fontSize="1rem" textAlign="center">
                            Accepted
                        </Typography>
                        <Typography
                            sx={{ color: handleColorPallet("mossGreen3") }}
                            fontFamily="Quattrocento sans"
                            fontSize="3rem"
                            textAlign="center">
                            {inviteStatus?.acceptedInvites.length}
                        </Typography>
                    </Box>
                    <Box sx={{ flex: "1", border: `.9px solid`, borderColor: borderColor }}>
                        <Typography fontFamily="Quattrocento sans" fontSize="1rem" textAlign="center">
                            Total invites
                        </Typography>
                        <Typography fontFamily="Quattrocento sans" fontSize="3rem" textAlign="center">
                            {user?.invites.length}
                        </Typography>
                    </Box>
                </Box>
                {/* invites progress */}
                <Box style={{ height: "100px", gridRow: "2", textAlign: "center" }}>
                    Progress <MyProgressBar invitesStatus={inviteStatus} />
                </Box>
                {/* names and date */}
                <Box
                    style={{
                        height: "210px",
                        gridColumn: "3 / 3",
                        gridRow: "1 / 3",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-evenly",
                    }}>
                    <Typography variant="h5" textAlign="center" fontFamily="Quattrocento sans">
                        {user?.nameA.first}-{user?.nameA.last} {user?.nameB?.first ? `& ${user?.nameB.first} - ` : ""}
                        {user?.nameB?.last ? user?.nameB.last : ""}
                    </Typography>
                    <Typography variant="h4" textAlign="center" fontFamily="Quattrocento sans"></Typography>
                    <Typography variant="h4" textAlign="center" fontFamily="Quattrocento sans"></Typography>
                    <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                        <Button variant="contained" color="mossGreen2" sx={{ height: "5vh", color: "background.default" }}>
                            Add date
                        </Button>
                        <Button
                            variant="contained"
                            color="mossGreen2"
                            sx={{ height: "5vh", color: "background.default", display: user?.nameB?.first ? "none" : "block" }}>
                            Add partner
                        </Button>
                    </Box>
                </Box>
                {/* groups */}
                <Box style={{ height: "450px" }}>
                    <Typography variant="h5" textAlign="center" fontFamily="Quattrocento sans" color={handleColorPallet("mossGreen3")}>
                        accepted guest groups
                        {user?.invites.map((invite) => (invite.isAccepted === true ? <Typography>{invite.group}</Typography> : null))}
                    </Typography>
                </Box>
                {/* invites by status */}
                <Box style={{ height: "450px" }}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "3px", height: "150px" }}>
                        <Typography variant="h5" textAlign="center" fontFamily="Quattrocento sans" color={handleColorPallet("mossGreen3")}>
                            Accepted
                        </Typography>
                        {/* {user?.invites.map((invite) => (invite.isAccepted === true ? <Typography>{invite.name.first}</Typography> : null))} */}
                        <InviteStatusPaginate invites={inviteStatus?.acceptedInvites} />
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "3px", height: "150px" }}>
                        <Typography variant="h5" textAlign="center" fontFamily="Quattrocento sans" color={handleColorPallet("mossGreen3")}>
                            Pending
                        </Typography>
                        {/* {user?.invites.map((invite) => (invite.isPending === true ? <Typography>{invite.name.first}</Typography> : null))} */}
                        <InviteStatusPaginate invites={inviteStatus?.pendingInvites} />
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "3px", height: "150px" }}>
                        <Typography variant="h5" textAlign="center" fontFamily="Quattrocento sans" color={handleColorPallet("mossGreen3")}>
                            Declined
                        </Typography>
                        {/* {user?.invites.map((invite) => (invite.isDeclined === true ? <Typography>{invite.name.first}</Typography> : null))} */}
                        <InviteStatusPaginate invites={inviteStatus?.declinedInvites} />
                    </Box>
                </Box>
                {/* TDL */}
                <Box style={{ height: "450px" }}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "3px", height: "225px" }}>
                        <Typography variant="h5" textAlign="center" fontFamily="Quattrocento sans" color={handleColorPallet("mossGreen3")}>
                            TO DO
                        </Typography>
                        <TDLPaginate TDL={TDL} handleAddTDL={handleAddTDL} />
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "3px", height: "225px" }}>
                        <Typography variant="h5" textAlign="center" fontFamily="Quattrocento sans" color={handleColorPallet("mossGreen3")}>
                            DONE
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default HomePage;
