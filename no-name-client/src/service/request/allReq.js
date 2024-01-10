import axios from "axios";
import PropTypes from "prop-types";
import { storeToken } from "../storage/storageService";
import { toastSuccess } from "../toast/toast";
const register = async (user) => {
    try {
        const res = await axios.post("/users/", user);
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

register.propTypes = {
    user: PropTypes.object.isRequired,
};

const login = async (email, password) => {
    try {
        const res = await axios.post("/users/login", { email, password });
        storeToken(res.data.jwt, true);
        toastSuccess("Login Success");
        return res.data;
    } catch (err) {
        console.log(err);
    }
};
login.propTypes = {
    email: PropTypes.string.isRequired,
    pass: PropTypes.string.isRequired,
};

export { register, login };
