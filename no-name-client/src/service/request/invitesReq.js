import axios from "axios";

// TODO: check all the requests

const addInvite = async (id, invite) => {
    try {
        const res = await axios.patch(`/users/invite/${id}`, invite);
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

const deleteInvite = async (id, inviteId) => {
    try {
        const res = await axios.delete(`/users/invite/${id}/${inviteId}`);
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

export { addInvite, deleteInvite };
