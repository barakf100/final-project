import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getUsers } from "../../store/async/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { Container, Button, TableContainer, Paper, TableHead, TableRow, TableCell, Avatar, Table, TableBody } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import EditIcon from "@mui/icons-material/Edit";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import FilterComponent from "../../components/filter/FilterComponent";
import ROUTES from "../../routes/ROUTES";
import { myBeige, myCream, myGray, myLightGray } from "../../colors";

const Users = () => {
    const [sortDirection, setSortDirection] = useState(null);
    const dispatch = useDispatch();
    const location = useLocation();
    const filter = new URLSearchParams(location.search).get("filter");
    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);
    const users = useSelector((state) => state.usersSlice.users).filter((user) => (filter ? user.nameA.first.startsWith(filter) : true));
    const handleSort = () => {
        setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    };
    const sortedUsers = [...users].sort((a, b) => {
        const aValue = parseInt(a.invites.length);
        const bValue = parseInt(b.invites.length);

        if (sortDirection === "asc") {
            return aValue - bValue;
        } else {
            return bValue - aValue;
        }
    });
    return (
        <>
            <Container sx={{ bgcolor: myCream, height: "10vh", display: "flex", justifyContent: "right", alignItems: "center" }}>
                <FilterComponent route={ROUTES.USERS} />
                <Button variant="contained" color="primary" sx={{ height: "5vh" }}>
                    add
                </Button>
            </Container>
            <Container>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center"></TableCell>
                                <TableCell align="center">First name</TableCell>
                                <TableCell align="center">Last name</TableCell>
                                <TableCell align="center">Email</TableCell>
                                <TableCell align="center">Phone</TableCell>
                                <TableCell align="center">Country</TableCell>
                                <TableCell align="center">
                                    Guest Number
                                    <Button
                                        style={{ minWidth: "5px" }}
                                        onClick={() => {
                                            handleSort("Guest Number");
                                        }}>
                                        {sortDirection === "asc" ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                                    </Button>
                                </TableCell>
                                <TableCell align="center"></TableCell>
                                <TableCell align="center"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortedUsers.map((user) => (
                                <TableRow key={user._id}>
                                    <TableCell align="center">
                                        <Avatar alt="user avatar" src={user.avatar} />
                                    </TableCell>
                                    <TableCell align="center">{user.nameA.first}</TableCell>
                                    <TableCell align="center">{user.nameA.last}</TableCell>
                                    <TableCell align="center">{user.email}</TableCell>
                                    <TableCell align="center">{user.phone}</TableCell>
                                    <TableCell align="center">{user.address.country}</TableCell>
                                    <TableCell align="center">{user.invites.length}</TableCell>
                                    <TableCell align="center" width={"80px"}>
                                        <Button style={{ minWidth: "40px" }}>
                                            <RemoveIcon />
                                        </Button>
                                        <Button style={{ minWidth: "40px", color: myLightGray }}>
                                            <EditIcon />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </>
    );
};

export default Users;
