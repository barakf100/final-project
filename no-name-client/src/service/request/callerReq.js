import axios from "axios";

// TODO: check all the requests

const getAllInvites = async (userId) => {
    try {
        const res = await axios.get(`/userCaller/${userId}`);
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

const updateArrival = async (userId, inviteId, arrival) => {
    try {
        const res = await axios.patch(`/userCaller/${userId}/${inviteId}`, { arrival });
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

export { getAllInvites, updateArrival };
