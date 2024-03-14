import axios from "axios";
import { getToken } from "../storage/storageService";
import { allToast } from "../toast/toast";

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
    console.log("here");
    console.log(user);
    try {
        console.log("here 2");
        console.log("req", `/users/${id}`);
        const res = await axios.put(`/users/${id}`, user, { headers: { Authorization: `bearer ${getToken()}` } });
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

const setMarryDate = async (id, date) => {
    try {
        const dateString = date.toISOString().slice(0, 10);
        const res = await axios.patch(
            `/users/date/${id}`,
            { marryDate: dateString },
            { headers: { Authorization: `bearer ${getToken()}` } }
        );
        allToast.toastSuccess("Marry date updated");
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

const setNameB = async (id, nameB) => {
    try {
        const res = await axios.patch(`/users/nameB/${id}`, { nameB }, { headers: { Authorization: `bearer ${getToken()}` } });
        allToast.toastSuccess("Name added");
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

export { getUserById, updateUser, deleteUser, setMarryDate, setNameB };
