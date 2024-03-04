import axios from "axios";
import { getToken } from "../../service/storage/storageService";
const getAllUsers = async () => {
    try {
        const res = await axios.get("/users/", {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

const removeUser = async (id) => {
    try {
        const res = await axios.delete(`/users/${id}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

export { getAllUsers, removeUser };
