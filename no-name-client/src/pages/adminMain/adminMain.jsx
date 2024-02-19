import React, { useEffect } from "react";
import * as Mui from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../store/async/usersSlice";
import UsersPie from "./ui/pieChart";
import UsersCalc from "../../service/calcs/usersCalc";
import { addTDL } from "../../service/request/TDLReq";
import AddTDL from "../home/addTDL/addTDL";

const AdminMain = () => {
    const [open, setOpen] = React.useState(false);
    const [callerId, setCallerId] = React.useState("");
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);
    const users = useSelector((bigPie) => bigPie.usersSlice.users);
    const callers = users.filter((user) => user.isCaller);
    const usersCount = UsersCalc.UsersCount(users);
    const invitesCount = UsersCalc.InvitesCount(users);
    const handleAddTDL = async (tdl) => {
        await addTDL(callerId, tdl);
    };
    const handleOpen = () => {
        setOpen((state) => !state);
    };
    return (
        <Mui.Container component="div" sx={{ maxWidth: "100vw !important", mx: 0 }}>
            <Mui.Typography textAlign="center" variant="h3" mb={2}>
                walcome back Admin
            </Mui.Typography>
            <Mui.Grid container spacing={3} sx={{ height: "79vh", width: "95vw", mx: 2 }}>
                <Mui.Grid item xs={4}>
                    <Mui.Box sx={{ height: "100%" }}>
                        <UsersPie
                            valA={invitesCount.acceptedCount}
                            labelA="accepted"
                            valB={invitesCount.declinedCount}
                            labelB="declined"
                            valC={invitesCount.pendingCount}
                            labelC="pending"
                            title={"invites success rate"}
                        />
                        <Mui.Typography textAlign="center" variant="h6">
                            success rate: {Math.round((invitesCount.acceptedCount / invitesCount.total) * 100)}%
                        </Mui.Typography>
                    </Mui.Box>
                </Mui.Grid>
                <Mui.Grid item xs={4}>
                    <Mui.Box sx={{ height: "100%" }}>
                        <UsersPie
                            valA={usersCount.callers}
                            valB={usersCount.marry}
                            title={"users"}
                            labelA="caller"
                            labelB="marry"
                            valC="0"
                        />
                    </Mui.Box>
                </Mui.Grid>
                <Mui.Grid item xs={4}>
                    <Mui.Box sx={{ height: "100%" }}>
                        <Mui.Typography textAlign="center" variant="h5">
                            Callers list
                        </Mui.Typography>
                        {callers.map((caller) => {
                            return (
                                <Mui.Grid container spacing={1} key={caller._id} sx={{ p: 1 }}>
                                    <Mui.Grid item xs={4}>
                                        <Mui.Avatar src={caller.image.src} />
                                    </Mui.Grid>
                                    <Mui.Grid item xs={4} alignSelf="center">
                                        <Mui.Typography variant="body1">
                                            {caller.nameA.first} {caller.nameA.last}
                                        </Mui.Typography>
                                    </Mui.Grid>
                                    <Mui.Grid item xs={4} alignSelf="center">
                                        <Mui.Button
                                            onClick={() => {
                                                handleOpen();
                                                setCallerId(caller._id);
                                            }}>
                                            Add a TDL
                                        </Mui.Button>
                                        <AddTDL open={open} setOpen={setOpen} handleAddTDL={handleAddTDL} />
                                    </Mui.Grid>
                                </Mui.Grid>
                            );
                        })}
                    </Mui.Box>
                </Mui.Grid>
            </Mui.Grid>
        </Mui.Container>
    );
};

export default AdminMain;
