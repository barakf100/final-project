import { Typography, Box, Container, Button } from "@mui/material";
import "../../fonts.css";
import * as Mui from "@mui/material";
import { useEffect, useState } from "react";
import { JWTDecode, getMyId, getToken } from "../../service/storage/storageService";
import { getUserById } from "../../service/request/marryReq";
import { MyProgressBar } from "../../components/progress";
import { handleColorPallet } from "../../service/colors/change";
import { addTDL, getAllTDLs } from "../../service/request/TDLReq";
import TDLPaginate from "./paginate/tdlPaginate";
import { splitInvitesByStatus } from "../../service/invites/invites";
import InviteStatusPaginate from "./paginate/inviteStatusPaginate";
import { DatePickerValue } from "./date/datePicker";
import dayjs from "dayjs";
import { NamePickerDialog } from "./namePicker/namePickerDialog";
import nextKey from "generate-my-key";
import AddTDL from "./addTDL/addTDL";
const HomePage = () => {
    const screenSM = Mui.useMediaQuery("(min-width:900px)");
    const screenXS = Mui.useMediaQuery("(min-width:600px)");
    const [user, setUser] = useState(null);
    const [TDL, setTDL] = useState([]);
    const [inviteStatus, setInviteStatus] = useState(null);
    const [reload, setReload] = useState(false);
    const { _id } = JWTDecode(getToken());
    const [value, setValue] = useState(dayjs("today"));
    const [open, setOpen] = useState(false);
    const [openTextField, setOpenTextField] = useState(false);
    const [openTDL, setOpenTDL] = useState(false);
    const [name, setName] = useState({
        first: "",
        middle: "",
        last: "",
    });
    useEffect(() => {
        const fetchUser = async () => {
            const { user: usr } = await getUserById(_id);
            setUser(usr);
            setValue(dayjs(usr.marryDate));
        };
        fetchUser();
    }, [_id, reload]);
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
    const handleAddTDL = async (tdl) => {
        try {
            await addTDL(getMyId(), tdl);
            handleReload();
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <Container maxWidth={"xl"} sx={{ padding: "0 !important" }}>
            <Typography component="div" variant="h3" textAlign="center" marginBottom="25px" fontFamily="Quattrocento sans">
                Welcome to the Home Page
            </Typography>
            <Mui.Grid container width="97vw" sx={{ "& .MuiGrid-root": { p: 1, my: 1 }, justifyContent: "center", margin: "0 auto" }}>
                <Mui.Grid
                    item
                    md={4}
                    sm={6}
                    xs={11}
                    sx={{
                        height: "30vh",
                        fontFamily: "Montserrat",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        fontSize: "1.3rem",
                        border: `.9px solid`,
                        borderRadius: "10px",
                        borderColor: handleColorPallet("teaGreen"),
                    }}>
                    Cheers to the beginning of your wonderful journey! Welcome to our wedding planning app—where dreams come true, one
                    detail at a time.
                </Mui.Grid>
                {/* invites status */}
                <Mui.Grid
                    item
                    md={3}
                    sm={5}
                    xs={11}
                    sx={{
                        display: "flex",
                        mx: screenXS ? 2 : 0,
                        border: `.9px solid`,
                        borderRadius: "10px",
                        borderColor: handleColorPallet("teaGreen"),
                    }}>
                    <Box sx={{ flex: "1" }}>
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                            <Box sx={{ flex: "1" }}>
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
                            <Box sx={{ flex: "1" /*border: `.9px solid`, borderColor: handleColorPallet("teaGreen")*/ }}>
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
                            <Box sx={{ flex: "1" /*border: `.9px solid`, borderColor: handleColorPallet("teaGreen")*/ }}>
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
                            <Box sx={{ flex: "1" /*border: `.9px solid`, borderColor: handleColorPallet("teaGreen")*/ }}>
                                <Typography fontFamily="Quattrocento sans" fontSize="1rem" textAlign="center">
                                    Total
                                </Typography>
                                <Typography fontFamily="Quattrocento sans" fontSize="3rem" textAlign="center">
                                    {user?.invites.length}
                                </Typography>
                            </Box>
                        </Box>
                        {/* invites progress */}
                        <Box sx={{ textAlign: "center" }}>
                            Progress <MyProgressBar invitesStatus={inviteStatus} />
                        </Box>
                    </Box>
                </Mui.Grid>
                {/* names and date */}
                <Mui.Grid
                    item
                    md={4}
                    sm={6}
                    xs={11}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-evenly",
                        border: `.9px solid`,
                        borderRadius: "10px",
                        borderColor: handleColorPallet("teaGreen"),
                    }}>
                    <Typography component="div" variant="h5" textAlign="center" fontFamily="Quattrocento sans">
                        {user?.nameA.first} {user?.nameA.last} {user?.nameB?.first ? `& ${user?.nameB.first} ` : ""}
                        {user?.nameB?.last ? user?.nameB.last : ""}
                    </Typography>
                    <Typography component="div" variant="h4" textAlign="center" fontFamily="Quattrocento sans">
                        {value.$D ? `${value.$D}.${value.$M + 1}.${value.$y}` : ""}
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                        <Button
                            onClick={() => setOpen(true)}
                            variant="contained"
                            color="mossGreen2"
                            sx={{ height: "5vh", color: "background.default" }}>
                            {value.$D ? "Modify date" : "Add date"}
                        </Button>
                        <DatePickerValue open={open} setOpen={setOpen} value={value} setValue={setValue} id={_id} />
                        <Button
                            onClick={() => setOpenTextField(true)}
                            variant="contained"
                            color="mossGreen2"
                            sx={{ height: "5vh", color: "background.default", display: user?.nameB?.first ? "none" : "block" }}>
                            Add partner
                        </Button>
                        <NamePickerDialog
                            openTextField={openTextField}
                            setOpenTextField={setOpenTextField}
                            id={_id}
                            name={name}
                            setName={setName}
                            setReload={setReload}
                        />
                    </Box>
                </Mui.Grid>
                {/* invites by status */}
                <Mui.Grid
                    item
                    md={4}
                    sm={5}
                    xs={11}
                    sx={{
                        height: "80vh",
                        border: `.9px solid`,
                        borderRadius: "10px",
                        borderColor: handleColorPallet("teaGreen"),
                        mx: screenSM ? 0 : screenXS ? 2 : 0,
                    }}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "3px", height: "26vh" }}>
                        <Typography
                            component="div"
                            variant="h5"
                            textAlign="center"
                            fontFamily="Quattrocento sans"
                            color={handleColorPallet("mossGreen3")}>
                            Accepted
                        </Typography>
                        <InviteStatusPaginate invites={inviteStatus?.acceptedInvites} />
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "3px", height: "26vh" }}>
                        <Typography
                            component="div"
                            variant="h5"
                            textAlign="center"
                            fontFamily="Quattrocento sans"
                            color={handleColorPallet("mossGreen3")}>
                            Pending
                        </Typography>
                        <InviteStatusPaginate invites={inviteStatus?.pendingInvites} />
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "3px", height: "26vh" }}>
                        <Typography
                            component="div"
                            variant="h5"
                            textAlign="center"
                            fontFamily="Quattrocento sans"
                            color={handleColorPallet("mossGreen3")}>
                            Declined
                        </Typography>
                        <InviteStatusPaginate invites={inviteStatus?.declinedInvites} />
                    </Box>
                </Mui.Grid>
                {/* groups */}
                <Mui.Grid
                    item
                    md={3}
                    sm={6}
                    xs={11}
                    sx={{
                        height: "80vh",
                        border: `.9px solid`,
                        borderRadius: "10px",
                        borderColor: handleColorPallet("teaGreen"),
                        mx: screenSM ? 2 : 0,
                    }}>
                    <Typography
                        component="div"
                        variant="h5"
                        textAlign="center"
                        fontFamily="Quattrocento sans"
                        color={handleColorPallet("mossGreen3")}>
                        accepted guest groups
                        {Array.from(
                            new Set(user?.invites.filter((invite) => invite.isAccepted === true).map((invite) => invite.group))
                        ).map((group) => (
                            <Typography key={nextKey()}>{group}</Typography>
                        ))}
                    </Typography>
                </Mui.Grid>
                {/* TDL */}
                <Mui.Grid
                    item
                    md={4}
                    sm={5}
                    xs={11}
                    sx={{
                        height: "80vh",
                        border: `.9px solid`,
                        borderRadius: "10px",
                        borderColor: handleColorPallet("teaGreen"),
                        mx: screenSM ? 0 : screenXS ? 2 : 0,
                    }}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "3px", height: "45vh" }}>
                        <Typography
                            component="div"
                            variant="h5"
                            textAlign="center"
                            fontFamily="Quattrocento sans"
                            color={handleColorPallet("mossGreen3")}>
                            TO DO
                        </Typography>
                        <TDLPaginate TDL={TDL} setOpen={setOpenTDL} userId={user?._id} setReload={setReload} done={false} />
                        <AddTDL open={openTDL} setOpen={setOpenTDL} handleAddTDL={handleAddTDL} />
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "3px", height: "45vh" }}>
                        <Typography
                            component="div"
                            variant="h5"
                            textAlign="center"
                            fontFamily="Quattrocento sans"
                            color={handleColorPallet("mossGreen3")}>
                            DONE
                        </Typography>
                        <TDLPaginate TDL={TDL} setOpen={setOpenTDL} userId={user?._id} setReload={setReload} done={true} />
                    </Box>
                </Mui.Grid>
            </Mui.Grid>
        </Container>
    );
};

export default HomePage;
