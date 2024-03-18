import axios from "axios";
import PropTypes from "prop-types";
import { storeToken } from "../storage/storageService";
import { allToast } from "../toast/toast";
import dayjs from "dayjs";
const register = async (user) => {
    try {
        const modDate = { ...user, marryDate: dayjs(user.marryDate, "DD/MM/YYYY").toISOString() };
        const res = await axios.post("/users/", modDate);
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

register.propTypes = {
    user: PropTypes.object.isRequired,
};

const login = async (email, password, remember) => {
    try {
        const res = await axios.post("/users/login", { email, password });
        storeToken(res.data.jwt, remember);
        allToast.toastSuccess("Login Success");
        return res.data;
    } catch (err) {
        allToast.toastError(err.response.data.message);
        console.log(err.response.data.message);
    }
};
login.propTypes = {
    email: PropTypes.string.isRequired,
    pass: PropTypes.string.isRequired,
    remember: PropTypes.bool.isRequired,
};

export { register, login };
