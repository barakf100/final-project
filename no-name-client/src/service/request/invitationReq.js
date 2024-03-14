import axios from "axios";
import { getToken } from "../storage/storageService";
import { allToast } from "../toast/toast";
const invitationReq = {
    getInvitation: async (id) => {
        const res = await axios
            .get(`/invitation/${id}`, {
                headers: { Authorization: `bearer ${getToken()}` },
            })
            .then((res) => res.data)
            .catch((err) => console.log(err));
        return res;
    },
    createInvitation: async (id, invitation) => {
        const formData = new FormData();
        formData.append("image", invitation);
        await axios
            .post(`/invitation/${id}`, formData, {
                headers: { Authorization: `bearer ${getToken()}`, "Content-Type": "multipart/form-data" },
            })
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err));
        allToast.toastSuccess("Invitation uploaded!");
    },
    deleteInvitation: async (id) => {
        await axios
            .delete(`/invitation/${id}`, {
                headers: { Authorization: `bearer ${getToken()}` },
            })
            .then((res) => allToast.toastSuccess("Invitation deleted!"))
            .catch((err) => console.log(err));
    },
};

export default invitationReq;
