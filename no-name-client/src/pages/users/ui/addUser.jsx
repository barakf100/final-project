import { useState } from "react";
import * as Mui from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import validProfile from "../../../validation/profileValid";
import { toastBreak } from "../../../service/toast/toast";
import { register } from "../../../service/request/allReq";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
const AddUser = (props) => {
    const { open, setOpen, setReload } = props;
    const [iseCaller, setIsCaller] = useState(false);
    const [type, setType] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [select, setSelect] = useState(); // 0: Marry, 1: Caller
    const [myError, setMyError] = useState({});
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const [userInfo, setUserInfo] = useState({
        nameA: { first: "", last: "" },
        nameB: { first: "", last: "" },
        address: { city: "", country: "", street: "", houseNumber: "", Zip: "" },
        image: { src: "https://picsum.photos/200/300", alt: "profile image" },
        email: "",
        phone: "",
        marryDate: "",
        password: "",
        isMarrying: false,
        isCaller: false,
    });
    const handleInputChange = (key, subKey, value) => {
        setUserInfo((prevState) => {
            if (subKey) {
                return {
                    ...prevState,
                    [key]: { ...prevState[key], [subKey]: value },
                };
            } else {
                return {
                    ...prevState,
                    [key]: value,
                };
            }
        });
    };
    const handleSelectChange = (e) => {
        setType(true);
        if (e.target.value === 0) {
            handleInputChange("isMarrying", null, true);
            handleInputChange("isCaller", null, false);
            setUserInfo({ ...userInfo, nameB: {}, marryDate: "" });
            setIsCaller(false);
            setSelect(0);
        } else {
            handleInputChange("isMarrying", null, false);
            handleInputChange("isCaller", null, true);
            setUserInfo({ ...userInfo, nameB: { first: "..", last: ".." }, marryDate: "01/01/9999" });
            setIsCaller(true);
            setSelect(1);
        }
    };
    const handleDateChange = (date) => {
        handleChange({
            target: {
                name: "marryDate",
                value: dayjs(date.$d).format("DD/MM/YYYY"),
            },
        });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        const keys = name.split(".");

        if (keys.length === 2) {
            setUserInfo((prevState) => ({
                ...prevState,
                [keys[0]]: {
                    ...prevState[keys[0]],
                    [keys[1]]: value,
                },
            }));
        } else {
            setUserInfo((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        const errors = validProfile(userInfo);
        if (errors && Object.keys(errors).length > 0) {
            toastBreak(errors, "error");
            setMyError(errors);
        } else {
            await register(userInfo);
            setReload((prev) => !prev);
            handleClose();
        }
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Mui.Dialog
            sx={{
                height: "91vh",
                width: "90vw",
                "& .MuiPaper-root": { height: "100%", width: "100%", "& .MuiBox-root": { justifyContent: "center", gap: "10px", mt: 1.2 } },
            }}
            open={open}
            onClose={handleClose}>
            <Mui.DialogTitle textAlign="center">Register new user</Mui.DialogTitle>
            <Mui.Box sx={{ display: "flex" }}>
                <Mui.TextField
                    required
                    error={isSubmitted && !!myError?.first}
                    disabled={!type}
                    onChange={handleChange}
                    name="nameA.first"
                    label="First Name"
                    variant="outlined"
                />
                <Mui.TextField
                    required
                    error={isSubmitted && !!myError?.first}
                    disabled={!type}
                    onChange={handleChange}
                    name="nameA.last"
                    label="Last Name"
                    variant="outlined"
                />
            </Mui.Box>
            <Mui.Box sx={{ display: "flex" }}>
                <Mui.TextField
                    required
                    error={isSubmitted && !!myError?.first}
                    onChange={handleChange}
                    name="nameB.first"
                    disabled={!type || iseCaller}
                    label="Partner Name"
                    variant="outlined"
                />
                <Mui.TextField
                    required
                    error={isSubmitted && !!myError?.first}
                    onChange={handleChange}
                    disabled={iseCaller || !type}
                    name="nameB.last"
                    label="Partner Last"
                    variant="outlined"
                />
            </Mui.Box>
            <Mui.Box sx={{ display: "flex" }}>
                <Mui.TextField
                    required
                    error={isSubmitted && !!myError?.first}
                    onChange={handleChange}
                    disabled={!type}
                    name="address.city"
                    label="City"
                    variant="outlined"
                />
                <Mui.TextField
                    required
                    error={isSubmitted && !!myError?.first}
                    onChange={handleChange}
                    disabled={!type}
                    name="address.country"
                    label="country"
                    variant="outlined"
                />
            </Mui.Box>
            <Mui.Box sx={{ display: "flex" }}>
                <Mui.TextField
                    required
                    disabled={!type}
                    error={isSubmitted && !!myError?.first}
                    onChange={handleChange}
                    name="address.street"
                    label="Street"
                    variant="outlined"
                />
                <Mui.TextField
                    required
                    disabled={!type}
                    error={isSubmitted && !!myError?.first}
                    onChange={handleChange}
                    name="address.houseNumber"
                    label="House number"
                    variant="outlined"
                />
            </Mui.Box>
            <Mui.Box sx={{ display: "flex" }}>
                <Mui.TextField
                    required
                    disabled={!type}
                    error={isSubmitted && !!myError?.first}
                    onChange={handleChange}
                    name="address.Zip"
                    label="Zip"
                    variant="outlined"
                />
                <Mui.TextField
                    required
                    disabled={!type}
                    error={isSubmitted && !!myError?.first}
                    onChange={handleChange}
                    name="email"
                    label="email"
                    variant="outlined"
                />
            </Mui.Box>
            <Mui.Box sx={{ display: "flex" }}>
                <Mui.TextField
                    required
                    disabled={!type}
                    error={isSubmitted && !!myError?.first}
                    onChange={handleChange}
                    name="phone"
                    label="Phone"
                    variant="outlined"
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        sx={{ width: "226px" }}
                        disabled={iseCaller || !type}
                        error={isSubmitted && !!myError?.first}
                        onChange={handleDateChange}
                        name="marryDate"
                        label="Wedding date"
                        variant="outlined"
                        format="DD/MM/YYYY"
                    />
                </LocalizationProvider>
            </Mui.Box>
            <Mui.Box sx={{ display: "flex" }}>
                <Mui.Tooltip
                    title={
                        <Mui.Typography variant="body2">
                            Password must be at 7 tp 20 characters long, contain at least 1 uppercase letter, 1 lowercase letter, 1 number
                            and 1 special character
                        </Mui.Typography>
                    }>
                    <Mui.TextField
                        required
                        disabled={!type}
                        error={isSubmitted && !!myError?.first}
                        sx={{ maxWidth: "226px" }}
                        onChange={handleChange}
                        name="password"
                        type={showPassword ? "text" : "password"}
                        label="Password"
                        variant="outlined"
                        InputProps={{
                            endAdornment: (
                                <Mui.InputAdornment position="end">
                                    <Mui.IconButton onClick={handleClickShowPassword}>
                                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </Mui.IconButton>
                                </Mui.InputAdornment>
                            ),
                        }}
                    />
                </Mui.Tooltip>
                <Mui.Select value={select} label="Age" sx={{ width: "226px", textAlign: "left" }} onChange={handleSelectChange} required>
                    <Mui.MenuItem value={0}>Marry</Mui.MenuItem>
                    <Mui.MenuItem value={1}>Caller</Mui.MenuItem>
                </Mui.Select>
            </Mui.Box>
            <Mui.DialogActions sx={{ display: "flex", justifyContent: "center" }}>
                <Mui.Button onClick={handleClose} color="mossGreen1">
                    Cancel
                </Mui.Button>
                <Mui.Button onClick={handleSubmit} color="mossGreen1">
                    Add
                </Mui.Button>
            </Mui.DialogActions>
        </Mui.Dialog>
    );
};

export default AddUser;
