import React, { useEffect } from "react";
import * as Mui from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../store/async/usersSlice";
import UsersPie from "./ui/pieChart";
import UsersCalc from "../../service/calcs/usersCalc";
import { addTDL } from "../../service/request/TDLReq";
import Paginate from "./ui/pagination";

const AdminMain = () => {
    const [open, setOpen] = React.useState(false);
    const [callerId, setCallerId] = React.useState("");
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);
    const users = useSelector((bigPie) => bigPie.usersSlice.users);
    const callers = users.filter((user) => user.isCaller);
    const marry = users.filter((user) => user.isMarrying);
    const usersCount = UsersCalc.UsersCount(users);
    const invitesCount = UsersCalc.InvitesCount(users);
    const handleAddTDL = async (tdl) => {
        tdl.name = "from admin - " + tdl.name;
        await addTDL(callerId, tdl);
    };
    const handleOpen = () => {
        setOpen((state) => !state);
    };
    return (
        <Mui.Container component="div" sx={{ maxWidth: "100vw !important", mx: 0 }}>
            <Mui.Typography textAlign="center" variant="h3" mb={2}>
                welcome back Admin
            </Mui.Typography>
            <Mui.Grid container spacing={3} sx={{ height: "79vh", width: "95vw" }}>
                <Mui.Grid item xs={12} md={6} lg={4} xl={4} alignSelf="center">
                    <Mui.Box sx={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <UsersPie
                            valA={invitesCount.acceptedCount}
                            labelA="accepted"
                            valB={invitesCount.declinedCount}
                            labelB="declined"
                            valC={invitesCount.pendingCount}
                            labelC="pending"
                            title={"invites success rate"}
                        />
                        <Mui.Typography textAlign="center" variant="h6" mt={3}>
                            success rate:{" "}
                            {Math.round((invitesCount.acceptedCount / (invitesCount.total === 0 ? 1 : invitesCount.total)) * 100)}%
                        </Mui.Typography>
                    </Mui.Box>
                </Mui.Grid>
                <Mui.Grid item xs={12} md={6} lg={4} xl={4} alignSelf="center">
                    <Mui.Box sx={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <UsersPie
                            valA={usersCount.callers}
                            valB={usersCount.marry}
                            title={"users"}
                            labelA="caller"
                            labelB="marry"
                            valC="0"
                        />
                        <Mui.Typography textAlign="center" variant="h6" mt={3}>
                            ratio: {usersCount.callers / usersCount.callers} : {(usersCount.marry / usersCount.callers).toFixed(1)}
                        </Mui.Typography>
                    </Mui.Box>
                </Mui.Grid>
                <Mui.Grid item xs={12} md={6} lg={4} xl={4}>
                    <Mui.Box sx={{ height: "50%" }}>
                        <Paginate
                            who={"caller"}
                            title="callers"
                            handleAddTDL={handleAddTDL}
                            handleOpen={handleOpen}
                            items={callers}
                            open={open}
                            setCallerId={setCallerId}
                            setOpen={setOpen}
                        />
                    </Mui.Box>
                    <Mui.Box sx={{ height: "50%" }}>
                        <Paginate who={"marry"} title="marry" items={marry} />
                    </Mui.Box>
                </Mui.Grid>
            </Mui.Grid>
        </Mui.Container>
    );
};

export default AdminMain;
