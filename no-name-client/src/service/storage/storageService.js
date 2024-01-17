import { jwtDecode } from "jwt-decode";

const TOKEN = "token";

const isLocalStorage = () => {
    return localStorage.getItem(TOKEN);
};

const storeToken = (token, rememberMe) => {
    if (rememberMe) {
        localStorage.setItem(TOKEN, token);
    } else {
        sessionStorage.setItem(TOKEN, token);
    }
};

const getToken = () => {
    let token = isLocalStorage();
    if (token) {
        return token;
    } else {
        return sessionStorage.getItem(TOKEN);
    }
};

const JWTDecode = (token) => {
    return jwtDecode(token);
};

const getMyId = () => {
    const token = getToken();
    if (token) {
        return JWTDecode(token)._id;
    }
};

export { storeToken, getToken, JWTDecode, getMyId };
