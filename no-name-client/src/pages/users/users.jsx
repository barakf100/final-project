import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getUsers } from "../../store/async/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import {
    Container,
    Button,
    TableContainer,
    Paper,
    TableHead,
    TableRow,
    TableCell,
    Avatar,
    Table,
    TableBody,
    Typography,
    Box,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import EditIcon from "@mui/icons-material/Edit";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import FilterComponent from "../../components/filter/FilterComponent";
import ROUTES from "../../routes/ROUTES";
import "../../fonts.css";

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
        <Typography component="div">
            <Container
                sx={{
                    height: "10vh",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}>
                <Typography variant="h4" fontFamily="Quattrocento" fontWeight={"300"} sx={{ textAlign: "left" }}>
                    USERS
                </Typography>
                <Box sx={{ display: "flex" }}>
                    <FilterComponent route={ROUTES.USERS} />
                    <Button variant="contained" color="mossGreen3" sx={{ height: "5vh", color: "background.default" }}>
                        add
                    </Button>
                </Box>
            </Container>
            <Container sx={{ p: "0!important" }}>
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
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center"></TableCell>
                                <TableCell align="center">First Name</TableCell>
                                <TableCell align="center">Last Name</TableCell>
                                <TableCell align="center">Email</TableCell>
                                <TableCell align="center">Phone</TableCell>
                                <TableCell align="center">Country</TableCell>
                                <TableCell align="center">
                                    Guest Number
                                    <Button
                                        color="mossGreen2"
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
                                        <Button color="mossGreen2" style={{ minWidth: "40px" }}>
                                            <RemoveIcon />
                                        </Button>
                                        <Button color="mossGreen2" style={{ minWidth: "40px" }}>
                                            <EditIcon />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </Typography>
    );
};

export default Users;
