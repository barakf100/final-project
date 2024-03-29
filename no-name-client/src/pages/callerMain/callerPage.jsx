import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../store/async/usersSlice";
import { Container, Typography, Box, useMediaQuery } from "@mui/material";
import { getUser } from "../../store/async/userSlice";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import { handleColorPallet } from "../../service/colors/change";
import TDLPaginate from "../home/paginate/tdlPaginate.jsx";
import { addTDL, getAllTDLs } from "../../service/request/TDLReq";
import { getMyId } from "../../service/storage/storageService";
import UsersPaginate from "./ui/paginateUsers.jsx";
import AddTDL from "../home/addTDL/addTDL.jsx";
const CallerPage = () => {
    const screenBreak = useMediaQuery("(max-width:1100px)");
    const [users, setUsers] = useState([]);
    const [caller, setCaller] = useState({});
    const [TDL, setTDL] = useState([]);
    const [reload, setReload] = useState(false);
    const [open, setOpen] = useState(false);
    const [openTDL, setOpenTDL] = useState(false);

    const reduxUsers = useSelector((state) => state.usersSlice.users);
    const reduxCaller = useSelector((state) => state.userSlice.user);
    const navigate = useNavigate();
    const handleReload = () => {
        setReload((prev) => !prev);
    };
    const handleAvatarClick = (nameA, nameB, id) => {
        navigate(ROUTES.INVITES, { state: { nameA, nameB, id } });
    };
    const dispatchUsers = useDispatch();
    const dispatchCaller = useDispatch();

    // get all Users
    useEffect(() => {
        dispatchUsers(getUsers());
    }, [dispatchUsers]);
    useEffect(() => {
        const marryUsers = reduxUsers.filter((user) => user.isMarrying === true);
        setUsers(marryUsers);
    }, [reduxUsers]);

    // get caller
    useEffect(() => {
        dispatchCaller(getUser());
    }, [dispatchCaller]);
    useEffect(() => {
        setCaller(reduxCaller);
    }, [reduxCaller]);
    const handleAddTDL = async (tdl) => {
        try {
            await addTDL(getMyId(), tdl);
            handleReload();
        } catch (err) {
            console.log(err);
        }
    };
    // get TDL
    useEffect(() => {
        const id = getMyId();
        const fetchTDL = async () => {
            const tdl = await getAllTDLs(id);
            setTDL(tdl);
        };
        fetchTDL();
    }, [reload]);
    return (
        <Container
            maxWidth="xl"
            sx={{
                textAlign: "center",
            }}>
            <Typography variant="h2">Welcome back {caller?.nameA?.first} </Typography>
            <Container
                maxWidth="xl"
                sx={{
                    display: "flex",
                    width: "100%",
                    px: "0!important",
                    justifyContent: screenBreak ? "center" : "space-between",
                    flexDirection: screenBreak ? "column" : "row",
                }}>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <UsersPaginate users={users} handleAvatarClick={handleAvatarClick} screenBreak={screenBreak} />
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Typography mb={1} variant="h5">
                        TO DO LIST
                    </Typography>
                    <Box
                        sx={{
                            height: "64vh",
                            width: screenBreak ? "80vw" : "45vw",
                            border: `.9px solid`,
                            borderRadius: "10px",
                            borderColor: handleColorPallet("teaGreen"),
                            px: "15px",
                            paddingTop: "10px",
                        }}>
                        <Box sx={{ display: "flex", flexDirection: "column", height: "29vh" }}>
                            <Typography
                                component="div"
                                variant="h5"
                                textAlign="center"
                                fontFamily="Quattrocento sans"
                                color={handleColorPallet("mossGreen3")}>
                                TO DO
                            </Typography>
                            <TDLPaginate TDL={TDL} userId={caller?._id} done={false} setOpen={setOpenTDL} setReload={setReload} />
                            <AddTDL open={openTDL} setOpen={setOpenTDL} handleAddTDL={handleAddTDL} />
                        </Box>
                        <Box sx={{ display: "flex", flexDirection: "column", height: "29vh", mt: 1 }}>
                            <Typography
                                component="div"
                                variant="h5"
                                textAlign="center"
                                fontFamily="Quattrocento sans"
                                color={handleColorPallet("mossGreen3")}>
                                DONE
                            </Typography>
                            <TDLPaginate TDL={TDL} userId={caller?._id} done={true} setOpen={setOpen} setReload={setReload} />
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Container>
    );
};

export default CallerPage;
