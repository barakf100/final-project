import axios from "axios";
import { getToken } from "../storage/storageService";

// TODO: check all the requests

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
        // return res.data;
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
        console.log(res, "res");
        return res.data;
    } catch (err) {
        console.log(err);
    }
};
const updateTDL = async (id, TDLId, TDL) => {
    try {
        const res = await axios.patch(`/TDL/${id}/${TDLId}`, TDL);
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

export { getAllTDLs, getTDLById, addTDL, updateTDL, deleteTDL, TDLDone };
