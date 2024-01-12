import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import axios from "axios";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/bigPie";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { getToken } from "./service/storage/storageService";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;
axios.defaults.headers.post["Content-Type"] = "application/json";
// axios.interceptors.request.use((config) => {
//     const token =
//         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hcnJ5QG1hcnJ5LmNvbSIsImlhdCI6MTcwNDExODgwMX0.XddZOWczmCvulNUGRf3cwvFIJwPmKBV1Rbhbv8zruyc";
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
// });
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
