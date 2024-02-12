import axios from "axios";
import { getToken } from "../storage/storageService";

const messageReq = {
    postMessage: async (message, id, type) => {
        try {
            const res = await axios.post(
                `/messages/${id}/${type}`,
                { message: message },
                { headers: { Authorization: `bearer ${getToken()}` } }
            );
            return res.data;
        } catch (err) {
            console.log(err.response);
        }
    },
    getMessages: async (id) => {
        try {
            const res = await axios.get(`/messages/${id}`, { headers: { Authorization: `bearer ${getToken()}` } });
            return res.data;
        } catch (err) {
            console.log(err.response);
        }
    },
    deleteMessage: async (id, type) => {
        try {
            const res = await axios.delete(`/messages/${id}/${type}`, { headers: { Authorization: `bearer ${getToken()}` } });
            return res.data;
        } catch (err) {
            console.log(err.response);
        }
    },
};

export default messageReq;
