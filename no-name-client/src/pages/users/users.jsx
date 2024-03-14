import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getUsers } from "../../store/async/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { Container, Button, TableContainer, Paper, TableHead, TableRow, TableCell, Table, TableBody, Typography, Box } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import FilterComponent from "../../components/filter/FilterComponent";
import ROUTES from "../../routes/ROUTES";
import "../../fonts.css";
import UserPaginate from "./ui/usersPaginate";
import AddUser from "./ui/addUser";
const Users = () => {
    const screenSize = useMediaQuery("(max-width:1000px)");
    const tableScreenSize = useMediaQuery("(max-width:800px)");
    const ITEM_PER_PAGE = screenSize ? 4 : 5;
    const [sortDirection, setSortDirection] = useState(null);
    const [reload, setReload] = useState(false);
    const [page, setPage] = useState(0);
    const [add, setAdd] = useState(false);
    const dispatch = useDispatch();
    const location = useLocation();
    const filter = new URLSearchParams(location.search).get("filter");
    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch, reload]);
    const users = useSelector((state) => state.usersSlice.users).filter((user) => (filter ? user.nameA.first.startsWith(filter) : true));
    useEffect(() => {}, [users, reload]);
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
    const handleNextPage = () => {
        if ((page + 1) * ITEM_PER_PAGE < users.length) {
            setPage(page + 1);
        }
    };
    const handlePreviousPage = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };
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
                    <Button
                        onClick={() => {
                            setAdd((prev) => !prev);
                        }}
                        variant="contained"
                        color="mossGreen3"
                        sx={{ height: "5vh", color: "background.default" }}>
                        Add
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
                            <TableRow sx={{ "& .MuiTableCell-root": { py: 1, px: { xs: 0, sm: 1 } } }}>
                                {!tableScreenSize && <TableCell align="center"></TableCell>}
                                <TableCell align="center">First</TableCell>
                                <TableCell align="center">Last</TableCell>
                                <TableCell align="center">Email</TableCell>
                                <TableCell align="center">Phone</TableCell>
                                {!tableScreenSize && <TableCell align="center">Country</TableCell>}
                                <TableCell align="center">
                                    Guests
                                    <Button
                                        color="mossGreen2"
                                        sx={{ minWidth: "5px" }}
                                        onClick={() => {
                                            handleSort("Guest Number");
                                        }}>
                                        {sortDirection === "asc" ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                                    </Button>
                                </TableCell>
                                <TableCell align="center">Type</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <UserPaginate
                                ITEM_PER_PAGE={ITEM_PER_PAGE}
                                page={page}
                                sortedUsers={sortedUsers}
                                setReload={setReload}
                                tableScreenSize={tableScreenSize}
                            />
                            {add ? <AddUser open={add} setOpen={setAdd} setReload={setReload} /> : null}
                        </TableBody>
                    </Table>
                    <Box
                        sx={{ display: "flex", justifyContent: "center", margin: "0 auto", position: "absolute", bottom: 10, left: "45%" }}>
                        <Button sx={{ height: "30px" }} color="mossGreen1" onClick={handlePreviousPage}>
                            Previous
                        </Button>
                        <Button sx={{ height: "30px" }} color="mossGreen1" onClick={handleNextPage}>
                            Next
                        </Button>
                    </Box>
                </TableContainer>
            </Container>
        </Typography>
    );
};

export default Users;
