import axios from "axios";

// TODO: check all the requests

const getAllTDLs = async (id) => {
    try {
        const res = await axios.get(`/TDL/${id}`);
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
        const res = await axios.post(`/TDL/${id}`, TDL);
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

export { getAllTDLs, getTDLById, addTDL, updateTDL, deleteTDL };
