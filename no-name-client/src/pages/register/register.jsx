import React, { useState } from "react";
import {
    Container,
    Typography,
    Box,
    TextField,
    Select,
    MenuItem,
    FormControl,
    Button,
    IconButton,
    InputAdornment,
    Tooltip,
} from "@mui/material";
import registerImage from "../../assets/register.jpeg";
import { handleColorPallet } from "../../service/colors/change";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { register } from "../../service/request/allReq";
import validProfile from "../../validation/profileValid";
import { allToast } from "../../service/toast/toast";
const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [select, setSelect] = useState(0); // 0: Marry, 1: Caller
    const [userInfo, setUserInfo] = useState({
        nameA: { first: "", last: "" },
        address: { city: "", country: "", street: "", houseNumber: "", Zip: "" },
        image: { src: "", alt: "profile image" },
        email: "",
        phone: "",
        marryDate: "",
        password: "",
        isMarrying: false,
        isCaller: false,
    });
    const [myError, setMyError] = useState({});
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
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleSelectChange = (e) => {
        if (e.target.value === 0) {
            handleInputChange("isMarrying", null, true);
            handleInputChange("isCaller", null, false);
        } else {
            handleInputChange("isMarrying", null, false);
            handleInputChange("isCaller", null, true);
        }
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
    const handleSubmit = (e) => {
        console.log(userInfo);
        e.preventDefault();
        setIsSubmitted(true);
        const errors = validProfile(userInfo);
        setMyError(errors);
        if (myError) {
            return allToast.toastError("Register failed");
        }
        setMyError({});
        register(userInfo);
        allToast.toastSuccess("Register successfully");
    };
    return (
        <Container maxWidth={"xl"} sx={{ display: "flex", gap: "2vw", justifyContent: "space-between", height: "85vh" }}>
            <Box sx={{ flex: 1 }}>
                <img src={registerImage} alt="flowers" width="87%" height="95%" />
            </Box>
            <Box sx={{ flex: 1.1, textAlign: "center" }}>
                <Typography color={handleColorPallet("teaGreen")} variant="h3">
                    Register
                </Typography>
                <FormControl component="form" variant="standard" sx={{ display: "flex", flexDirection: "row" }}>
                    <Box
                        sx={{
                            flex: 1,
                            "& .MuiTextField-root": { mt: 2, position: "relative" },
                            "& .MuiFormHelperText-root": {
                                position: "absolute",
                                bottom: "-16.5px",
                            },
                        }}>
                        <TextField
                            error={isSubmitted && !!myError.first}
                            helperText={myError.first}
                            onChange={handleChange}
                            name="nameA.first"
                            label="First name"
                            variant="standard"
                            required
                        />
                        <TextField
                            error={isSubmitted && !!myError.city}
                            helperText={myError.city}
                            onChange={handleChange}
                            name="address.city"
                            label="City"
                            variant="standard"
                            required
                        />
                        <TextField
                            error={isSubmitted && !!myError.state}
                            helperText={myError.state}
                            onChange={handleChange}
                            name="address.state"
                            label="State"
                            variant="standard"
                        />
                        <TextField
                            error={isSubmitted && !!myError.houseNumber}
                            helperText={myError.houseNumber}
                            onChange={handleChange}
                            name="address.houseNumber"
                            label="House number"
                            variant="standard"
                            required
                        />
                        <TextField
                            error={isSubmitted && !!myError.email}
                            helperText={myError.email}
                            onChange={handleChange}
                            name="email"
                            label="Email"
                            variant="standard"
                            required
                        />
                        <Tooltip
                            title={
                                <Typography variant="body2">
                                    Password must be at 7 tp 20 characters long, contain at least 1 uppercase letter, 1 lowercase letter, 1
                                    number and 1 special character
                                </Typography>
                            }>
                            <TextField
                                sx={{ maxWidth: "198px" }}
                                error={isSubmitted && !!myError.password}
                                helperText={myError.password}
                                onChange={handleChange}
                                name="password"
                                type={showPassword ? "text" : "password"}
                                label="Password"
                                variant="standard"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleClickShowPassword}>
                                                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                required
                            />
                        </Tooltip>
                        <TextField onChange={handleChange} name="image.src" label="Image" variant="standard" />
                    </Box>
                    <Box
                        sx={{
                            flex: 1,
                            "& .MuiTextField-root": { mt: 2, position: "relative" },
                            "& .MuiFormHelperText-root": {
                                position: "absolute",
                                bottom: "-16.5px",
                            },
                        }}>
                        <TextField
                            error={isSubmitted && !!myError.last}
                            helperText={myError.last}
                            onChange={handleChange}
                            name="nameA.last"
                            label="Last name"
                            variant="standard"
                            required
                        />
                        <TextField
                            error={isSubmitted && !!myError.country}
                            helperText={myError.country}
                            onChange={handleChange}
                            name="address.country"
                            label="Country"
                            variant="standard"
                            required
                        />
                        <TextField
                            error={isSubmitted && !!myError.street}
                            helperText={myError.street}
                            onChange={handleChange}
                            name="address.street"
                            label="Street"
                            variant="standard"
                            required
                        />
                        <TextField
                            error={isSubmitted && !!myError.Zip}
                            helperText={myError.Zip}
                            onChange={handleChange}
                            name="address.Zip"
                            label="Zip"
                            variant="standard"
                            required
                        />
                        <TextField
                            error={isSubmitted && !!myError.phone}
                            helperText={myError.phone}
                            onChange={handleChange}
                            name="phone"
                            label="Phone number"
                            variant="standard"
                            required
                        />
                        <br />
                        <TextField
                            error={isSubmitted && !!myError.marryDate}
                            helperText={myError.marryDate}
                            onChange={handleChange}
                            name="marryDate"
                            label="Wedding date"
                            variant="standard"
                            required
                        />
                        <Select value={select} label="Age" sx={{ width: "198px", mt: 4, textAlign: "left" }} onChange={handleSelectChange}>
                            <MenuItem value={0}>Marry</MenuItem>
                            <MenuItem value={1}>Caller</MenuItem>
                        </Select>
                    </Box>
                </FormControl>
                <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2, ml: 2 }}>
                    Submit
                </Button>
            </Box>
        </Container>
    );
};

export default Register;
