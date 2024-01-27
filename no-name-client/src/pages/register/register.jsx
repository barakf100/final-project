import React, { useState } from "react";
import { Container, Typography, Box, TextField, Select, MenuItem, FormControl, Button, IconButton, InputAdornment } from "@mui/material";
import registerImage from "../../assets/register.jpeg";
import { handleColorPallet } from "../../service/colors/change";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { register } from "../../service/request/allReq";
import validProfile from "../../validation/profileValid";
import { allToast } from "../../service/toast/toast";
const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [select, setSelect] = useState(0); // 0: Marry, 1: Caller
    const [userInfo, setUserInfo] = useState({
        nameA: { first: "", last: "" },
        nameB: { first: "", last: "" },
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
        const err = validProfile(userInfo);
        console.log(err);
        setMyError(err);
        console.log("state", myError);
        if (err) {
            Object.entries(err).forEach(([key, value]) => {
                // console.log(`${key} : ${value}`);
                // allToast.toastError(`${key} : ${value}`);
            });
            return;
        }
        // TODO: error handling - error={myError.nameA?.first ? true : false} - the function enter to the state twice on the same name
        e.preventDefault();
        register(userInfo);
        allToast.toastSuccess("Register successfully");
    };

    return (
        <Container maxWidth={"xl"} sx={{ display: "flex", gap: "2vw", justifyContent: "space-between", height: "90vh" }}>
            <Box sx={{ flex: 1 }}>
                <img src={registerImage} alt="flowers" width="87%" height="90%" />
            </Box>
            <Box sx={{ flex: 1.1, textAlign: "center" }}>
                <Typography color={handleColorPallet("teaGreen")} variant="h3">
                    Register
                </Typography>
                <FormControl component="form" variant="standard" sx={{ display: "flex", flexDirection: "row" }}>
                    <Box sx={{ flex: 1, "& .MuiTextField-root": { mt: 1 } }}>
                        <TextField onChange={handleChange} name="nameA.first" label="First name" variant="standard" />
                        <TextField
                            error={myError.nameA?.first ? true : false}
                            onChange={handleChange}
                            name="nameB.first"
                            label="First name"
                            variant="standard"
                        />
                        <TextField onChange={handleChange} name="address.city" label="City" variant="standard" />
                        <TextField onChange={handleChange} name="address.state" label="State" variant="standard" />
                        <TextField onChange={handleChange} name="address.houseNumber" label="House number" variant="standard" />
                        <TextField onChange={handleChange} name="email" label="Email" variant="standard" />
                        <TextField
                            sx={{ maxWidth: "198px" }}
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
                        />

                        <TextField onChange={handleChange} name="image.src" label="Image" variant="standard" />
                    </Box>
                    <Box sx={{ flex: 1, "& .MuiTextField-root": { mt: 1 } }}>
                        <TextField onChange={handleChange} name="nameA.last" label="Last name" variant="standard" />
                        <TextField onChange={handleChange} name="nameB.last" label="Last name" variant="standard" />
                        <TextField onChange={handleChange} name="address.country" label="Country" variant="standard" />
                        <TextField onChange={handleChange} name="address.street" label="Street" variant="standard" />
                        <TextField onChange={handleChange} name="address.Zip" label="Zip" variant="standard" />
                        <TextField onChange={handleChange} name="phone" label="Phone number" variant="standard" />
                        <br />
                        <Select value={select} label="Age" sx={{ width: "198px", mt: 2, textAlign: "left" }} onChange={handleSelectChange}>
                            <MenuItem value={0}>Marry</MenuItem>
                            <MenuItem value={1}>Caller</MenuItem>
                        </Select>
                        <TextField onChange={handleChange} name="marryDate" label="Wedding date" variant="standard" />
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
