import axios from "axios";
import { allToast } from "../toast/toast";
import { getToken } from "../storage/storageService";

const addInvite = async (id, invite) => {
    try {
        const res = await axios.patch(`/users/invite/${id}`, invite, { headers: { Authorization: `bearer ${getToken()}` } });
        allToast.toastSuccess("invite added");
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

const deleteInvite = async (id, inviteId) => {
    try {
        const res = await axios.delete(`/users/invite/${id}/${inviteId}`, { headers: { Authorization: `bearer ${getToken()}` } });
        allToast.toastSuccess("invite deleted");
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

const updateInvite = async (id, inviteId, invite) => {
    try {
        const res = await axios.patch(
            `/users/invite/${id}/${inviteId}`,
            { invite: invite },
            { headers: { Authorization: `bearer ${getToken()}` } }
        );
        allToast.toastSuccess("invite updated");
        return res.data;
    } catch (err) {
        console.log(err);
    }
};
export { addInvite, deleteInvite, updateInvite };
