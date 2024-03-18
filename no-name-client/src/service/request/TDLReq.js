import axios from "axios";
import { getToken } from "../storage/storageService";
import { allToast } from "../toast/toast";

const getAllTDLs = async (id) => {
    try {
        const token = getToken();
        const res = await axios.get(`/TDL/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

const getTDLById = async (id, TDLId) => {
    try {
        const res = await axios.get(`/TDL/${id}/${TDLId}`);
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

const addTDL = async (id, TDL) => {
    try {
        const res = await axios.post(`/TDL/${id}`, TDL, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        allToast.toastSuccess("TDL added successfully");
        return Promise.resolve(res.data);
    } catch (err) {
        console.log(err);
    }
};
const TDLDone = async (id, TDLId) => {
    try {
        const res = await axios.patch(
            `/TDL/${id}/${TDLId}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            }
        );
        return res.data;
    } catch (err) {
        console.log(err);
    }
};
const deleteTDL = async (id, TDLId) => {
    try {
        const res = await axios.delete(`/TDL/${id}/${TDLId}`);
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

export { getAllTDLs, getTDLById, addTDL, deleteTDL, TDLDone };
