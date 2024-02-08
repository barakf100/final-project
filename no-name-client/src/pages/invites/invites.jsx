import * as mui from "@mui/material";
import * as icons from "@mui/icons-material";
import { useEffect, useState } from "react";
import { getAllInvites } from "../../service/request/callerReq";
import { getMyId } from "../../service/storage/storageService";
import { addInvite, deleteInvite, updateInvite } from "../../service/request/invitesReq";
const ITEM_PER_PAGE = 6;
const CustomTextField = ({ id, setNewInvite, newInvite, ...props }) => {
    const handleChange = (e) => {
        if (id.includes(".")) {
            const [parent, child] = id.split(".");
            setNewInvite((prev) => ({ ...prev, [parent]: { ...prev[parent], [child]: e.target.value } }));
        } else {
            setNewInvite((prev) => ({ ...prev, [id]: e.target.value }));
        }
    };
    const value = id.includes(".") ? newInvite[id.split(".")[0]][id.split(".")[1]] : newInvite[id];
    return (
        <mui.TextField
            variant="standard"
            sx={{ height: "24px" }}
            onChange={handleChange}
            value={value || ""}
            inputProps={{ style: { textAlign: "center" } }}
            {...props}
        />
    );
};
const InvitesPage = () => {
    const [page, setPage] = useState(0);
    const [invitesArr, setInvitesArr] = useState(null);
    const [isAdd, setIsAdd] = useState(true);
    const [editId, setEditId] = useState(null);
    const [reload, setReload] = useState(false);
    const [newInvite, setNewInvite] = useState({
        name: { first: "", last: "" },
        group: "",
        phone: "",
        isAccepted: false,
        isDeclined: false,
        isPending: true,
    });
    const [editingInvite, setEditingInvite] = useState(null);
    const userId = getMyId();
    useEffect(() => {
        const fetchInvites = async () => {
            const { invites } = await getAllInvites(userId);
            setInvitesArr(invites);
        };
        fetchInvites();
    }, [userId, newInvite, reload]);
    const handleAdd = () => {
        setIsAdd((prev) => !prev);
    };
    const PaginateInvites = invitesArr?.slice(page * ITEM_PER_PAGE, (page + 1) * ITEM_PER_PAGE);
    const handleSave = () => {
        addInvite(userId, { invites: newInvite });
        setNewInvite({
            name: { first: "", last: "" },
            group: "",
            phone: "",
            isAccepted: false,
            isDeclined: false,
            isPending: true,
        });
        setIsAdd((prev) => !prev);
    };
    const handleEditSave = (editingInvite, inviteId) => {
        updateInvite(userId, inviteId, editingInvite);
        setReload((prev) => !prev);
    };
    const handleDelete = (userId, inviteId) => {
        deleteInvite(userId, inviteId);
        setReload((prev) => !prev);
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
        <mui.Box>
            <mui.Typography sx={{ textAlign: "center" }} variant="h4">
                Invites
            </mui.Typography>
            <mui.TableContainer component={mui.Paper} sx={{ border: `1px solid beige`, boxShadow: 0 }}>
                <mui.Table>
                    <mui.TableHead>
                        <mui.TableRow>
                            <mui.TableCell sx={{ borderRight: "1px solid beige", borderTop: "1px solid beige" }} align="center">
                                #
                            </mui.TableCell>
                            <mui.TableCell align="center">First Name</mui.TableCell>
                            <mui.TableCell align="center">Last Name</mui.TableCell>
                            <mui.TableCell align="center">Group</mui.TableCell>
                            <mui.TableCell align="center">Phone</mui.TableCell>
                            <mui.TableCell align="center">actions</mui.TableCell>
                        </mui.TableRow>
                    </mui.TableHead>
                    <mui.TableBody>
                        {PaginateInvites?.map((invite, index) => (
                            <mui.TableRow key={invite?._id}>
                                <mui.TableCell sx={{ width: "30px", borderRight: "1px solid beige" }} align="center">
                                    {page * ITEM_PER_PAGE + index + 1}
                                </mui.TableCell>
                                <mui.TableCell align="center">
                                    {editId === invite?._id ? (
                                        // <mui.TextField id="name.first" value={invite?.name.first} />
                                        <CustomTextField id="name.first" newInvite={editingInvite} setNewInvite={setEditingInvite} />
                                    ) : (
                                        invite?.name.first
                                    )}
                                </mui.TableCell>
                                <mui.TableCell align="center">
                                    {editId === invite?._id ? (
                                        // <mui.TextField id="name.last" value={invite?.name.last} />
                                        <CustomTextField id="name.last" newInvite={editingInvite} setNewInvite={setEditingInvite} />
                                    ) : (
                                        invite?.name.last
                                    )}
                                </mui.TableCell>
                                <mui.TableCell align="center">
                                    {editId === invite?._id ? (
                                        // <mui.TextField id="group" value={invite?.group} />
                                        <CustomTextField id="group" newInvite={editingInvite} setNewInvite={setEditingInvite} />
                                    ) : (
                                        invite?.group
                                    )}
                                </mui.TableCell>
                                <mui.TableCell align="center">
                                    {editId === invite?._id ? (
                                        //  <mui.TextField id="phone" value={invite?.phone} />
                                        <CustomTextField id="phone" newInvite={editingInvite} setNewInvite={setEditingInvite} />
                                    ) : (
                                        invite?.phone
                                    )}
                                </mui.TableCell>
                                <mui.TableCell align="center">
                                    <mui.Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
                                        {!(editId === invite?._id) ? (
                                            <icons.Edit
                                                color="mossGreen1"
                                                sx={{ cursor: "pointer" }}
                                                onClick={() => {
                                                    setEditId(invite?._id);
                                                    setEditingInvite(invite);
                                                }}
                                            />
                                        ) : (
                                            <icons.Save
                                                color="mossGreen1"
                                                sx={{ cursor: "pointer" }}
                                                onClick={(e) => {
                                                    setEditId(null);
                                                    handleEditSave(editingInvite, invite?._id);
                                                }}
                                            />
                                        )}
                                        <icons.Delete
                                            color="mossGreen1"
                                            sx={{ cursor: "pointer" }}
                                            onClick={() => {
                                                handleDelete(userId, invite?._id);
                                            }}
                                        />
                                    </mui.Box>
                                </mui.TableCell>
                            </mui.TableRow>
                        ))}
                        {isAdd ? (
                            <mui.TableRow>
                                <mui.TableCell align="center" onClick={handleAdd}>
                                    <icons.Add color="mossGreen1" sx={{ cursor: "pointer" }} />
                                </mui.TableCell>
                            </mui.TableRow>
                        ) : (
                            <mui.TableRow>
                                <mui.TableCell sx={{ borderRight: "1px solid beige", height: "24px" }} align="center">
                                    {invitesArr?.length + 1}
                                </mui.TableCell>
                                <mui.TableCell align="center">
                                    <CustomTextField id="name.first" newInvite={newInvite} setNewInvite={setNewInvite} />
                                </mui.TableCell>
                                <mui.TableCell align="center">
                                    <CustomTextField id="name.last" newInvite={newInvite} setNewInvite={setNewInvite} />
                                </mui.TableCell>
                                <mui.TableCell align="center">
                                    <CustomTextField id="group" newInvite={newInvite} setNewInvite={setNewInvite} />
                                </mui.TableCell>
                                <mui.TableCell align="center">
                                    <CustomTextField id="phone" newInvite={newInvite} setNewInvite={setNewInvite} />
                                </mui.TableCell>
                                <mui.TableCell align="center" onClick={handleSave}>
                                    <icons.Save color="mossGreen1" sx={{ cursor: "pointer" }} />
                                </mui.TableCell>
                            </mui.TableRow>
                        )}
                    </mui.TableBody>
                </mui.Table>
            </mui.TableContainer>
            <mui.Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <mui.Button sx={{ height: "30px" }} color="mossGreen1" onClick={handlePreviousPage}>
                    Previous
                </mui.Button>
                <mui.Button sx={{ height: "30px" }} color="mossGreen1" onClick={handleNextPage}>
                    Next
                </mui.Button>
            </mui.Box>
        </mui.Box>
    );
};

export default InvitesPage;
