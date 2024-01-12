import axios from "axios";
import { getToken } from "../storage/storageService";

// TODO: check all the requests

const getUserById = async (id) => {
    try {
        const res = await axios.get(`/users/${id}`, { headers: { Authorization: `bearer ${getToken()}` } });
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

const updateUser = async (id, user) => {
    try {
        const res = await axios.put(`/users/${id}`, user);
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

const deleteUser = async (id) => {
    try {
        const res = await axios.delete(`/users/${id}`);
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

export { getUserById, updateUser, deleteUser };
