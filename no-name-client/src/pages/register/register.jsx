import React, { useState } from "react";
import {
    Container,
    Typography,
    Box,
    TextField,
    Select,
    MenuItem,
    FormHelperText,
    FormControl,
    Button,
    IconButton,
    InputAdornment,
    Tooltip,
} from "@mui/material";
import { useMediaQuery } from "@mui/material";
import registerImage from "../../assets/register.jpeg";
import { handleColorPallet } from "../../service/colors/change";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { register } from "../../service/request/allReq";
import validProfile from "../../validation/profileValid";
import { allToast } from "../../service/toast/toast";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
const Register = () => {
    const navigate = useNavigate();
    const screenBreak = useMediaQuery("(min-width: 850px)");
    const screenBreakMobile = useMediaQuery("(min-width: 450px)");
    const [isCaller, setIsCaller] = useState(false);
    const [type, setType] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [select, setSelect] = useState(2); // 0: Marry, 1: Caller
    const [userInfo, setUserInfo] = useState({
        nameA: { first: "", last: "" },
        nameB: { first: "", last: "" },
        address: { city: "", country: "", street: "", houseNumber: "", Zip: "" },
        image: { src: "https://picsum.photos/200/300", alt: "profile image" },
        email: "",
        phone: "",
        marryDate: "",
        password: "",
        isMarrying: undefined,
        isCaller: undefined,
    });
    const [myError, setMyError] = useState({});
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleSelectChange = (e) => {
        if (e.target.value === 0) {
            setUserInfo({ ...userInfo, isMarrying: true, isCaller: false, nameB: {}, marryDate: "" });
            setSelect(0);
            setIsCaller(false);
            setType(true);
        } else if (e.target.value === 1) {
            setIsCaller(true);
            setUserInfo({ ...userInfo, nameB: { first: "..", last: ".." }, marryDate: "01/01/9999", isMarrying: false, isCaller: true });
            setSelect(1);
            setType(true);
        } else setType(false);
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
        const errors = validProfile(userInfo);
        setMyError(errors);
        e.preventDefault();
        setIsSubmitted(true);
        if (errors) {
            return allToast.toastError("Register failed");
        } else {
            setMyError({});
            await register(userInfo);
            navigate(ROUTES.LOGIN);
        }
    };
    return (
        <Container maxWidth={"xl"} sx={{ display: "flex", gap: "2vw", justifyContent: "space-between", height: "85vh" }}>
            {screenBreak && (
                <Box sx={{ flex: 1 }}>
                    <img src={registerImage} alt="flowers" width="87%" height="95%" />
                </Box>
            )}
            <Box sx={{ flex: 1.1, textAlign: "center" }}>
                <Typography color={handleColorPallet("teaGreen")} variant="h3">
                    Register
                </Typography>
                <FormControl
                    component="form"
                    variant="standard"
                    sx={{ display: "flex", flexDirection: screenBreakMobile ? "column" : "row" }}>
                    <Box
                        sx={{
                            flex: 1,
                            "& .MuiTextField-root": { mt: 1, position: "relative" },
                            "& .MuiFormHelperText-root": {
                                position: "absolute",
                                bottom: "-16.5px",
                            },
                        }}>
                        <TextField
                            error={isSubmitted && !!myError?.["nameA.first"]}
                            helperText={myError?.["nameA.first"]}
                            onChange={handleChange}
                            disabled={!type}
                            name="nameA.first"
                            label="First name"
                            variant="standard"
                            required
                        />
                        <TextField
                            error={isSubmitted && !!myError?.["nameB.first"]}
                            helperText={myError?.["nameB.first"]}
                            disabled={isCaller || !type}
                            onChange={handleChange}
                            name="nameB.first"
                            label="Partner first"
                            variant="standard"
                            required
                        />
                        <TextField
                            error={isSubmitted && !!myError?.["address.city"]}
                            helperText={myError?.["address.city"]}
                            onChange={handleChange}
                            disabled={!type}
                            name="address.city"
                            label="City"
                            variant="standard"
                            required
                        />
                        <TextField
                            error={isSubmitted && !!myError?.["address.state"]}
                            helperText={myError?.["address.state"]}
                            onChange={handleChange}
                            disabled={!type}
                            name="address.state"
                            label="State"
                            variant="standard"
                        />
                        <TextField
                            error={isSubmitted && !!myError?.["address.houseNumber"]}
                            helperText={myError?.["address.houseNumber"]}
                            onChange={handleChange}
                            disabled={!type}
                            name="address.houseNumber"
                            label="House number"
                            variant="standard"
                            required
                        />
                        <TextField
                            error={isSubmitted && !!myError?.email}
                            helperText={myError?.email}
                            onChange={handleChange}
                            disabled={!type}
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
                                error={isSubmitted && !!myError?.password}
                                helperText={myError?.password}
                                onChange={handleChange}
                                disabled={!type}
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
                        <TextField onChange={handleChange} disabled={!type} name="image.src" label="Image" variant="standard" />
                    </Box>
                    <Box
                        sx={{
                            flex: 1,
                            "& .MuiTextField-root": { mt: 1, position: "relative" },
                            "& .MuiFormHelperText-root": {
                                position: "absolute",
                                bottom: "-16.5px",
                            },
                        }}>
                        <Select
                            autoFocus={true}
                            value={select}
                            sx={{ width: "198px", mt: 3, textAlign: "left" }}
                            onChange={handleSelectChange}>
                            <MenuItem value={0}>Marry</MenuItem>
                            <MenuItem value={1}>Caller</MenuItem>
                            <MenuItem value={2}>Choose</MenuItem>
                        </Select>
                        <TextField
                            error={isSubmitted && !!myError?.["nameA.last"]}
                            helperText={myError?.["nameA.last"]}
                            onChange={handleChange}
                            disabled={!type}
                            name="nameA.last"
                            label="Last name"
                            variant="standard"
                            required
                        />
                        <TextField
                            error={isSubmitted && !!myError?.["nameB.last"]}
                            helperText={myError?.["nameB.last"]}
                            disabled={isCaller || !type}
                            onChange={handleChange}
                            name="nameB.last"
                            label="Partner last"
                            variant="standard"
                            required
                        />
                        <TextField
                            error={isSubmitted && !!myError?.["address.country"]}
                            helperText={myError?.["address.country"]}
                            onChange={handleChange}
                            disabled={!type}
                            name="address.country"
                            label="Country"
                            variant="standard"
                            required
                        />
                        <TextField
                            error={isSubmitted && !!myError?.["address.street"]}
                            helperText={myError?.["address.street"]}
                            onChange={handleChange}
                            disabled={!type}
                            name="address.street"
                            label="Street"
                            variant="standard"
                            required
                        />
                        <TextField
                            error={isSubmitted && !!myError?.["address.Zip"]}
                            helperText={myError?.["address.Zip"]}
                            onChange={handleChange}
                            disabled={!type}
                            name="address.Zip"
                            label="Zip"
                            variant="standard"
                            required
                        />
                        <TextField
                            error={isSubmitted && !!myError?.phone}
                            helperText={myError?.phone}
                            onChange={handleChange}
                            disabled={!type}
                            name="phone"
                            label="Phone number"
                            variant="standard"
                            required
                        />
                        <br />
                        <TextField
                            error={isSubmitted && !!myError?.marryDate}
                            helperText={myError?.marryDate}
                            disabled={isCaller || !type}
                            onChange={handleChange}
                            name="marryDate"
                            label="Wedding date"
                            variant="standard"
                            required
                        />
                    </Box>
                </FormControl>
                <Button variant="contained" onClick={handleSubmit} disabled={!type} sx={{ mt: 2, ml: 2 }}>
                    Submit
                </Button>
            </Box>
        </Container>
    );
};

export default Register;
