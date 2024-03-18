import { useEffect, useState } from "react";
import { Typography, Button, Box, useMediaQuery } from "@mui/material";
import ringImage from "../../assets/profile.jpeg";
import { handleColorPallet } from "../../service/colors/change";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../store/async/userSlice";
import { updateUser } from "../../service/request/marryReq";
import EditableTextField from "./styled/styledTextField";
import validProfile from "../../validation/profileValid";
import { toastBreak } from "../../service/toast/toast";

const ProfilePage = () => {
    const screen = useMediaQuery("(min-width:750px)");
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [userInfo, setUserInfo] = useState({
        nameA: { first: "", last: "" },
        nameB: { first: "", last: "" },
        address: { city: "", country: "", street: "", houseNumber: "", zip: "" },
        email: "",
        phone: "",
        marryDate: "",
    });
    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    const user = useSelector((state) => state.userSlice.user);
    useEffect(() => {
        if (user) {
            const {
                _id,
                createdAt,
                isAdmin,
                invites,
                TDL,
                __v,
                isMarrying,
                isCaller,
                phone,
                email,
                nameA: { _id: _d, ...restNameA },
                nameB: { _id: __, ...restNameB },
                address: { _id: ___, ...restAddress },
                image: { _id: ____, ...restImage },
                ...rest
            } = user;
            setUserInfo({
                nameA: restNameA,
                nameB: restNameB,
                address: restAddress,
                image: restImage,
                isMarrying,
                isCaller,
                phone,
                email,
            });
        }
    }, [user]);
    const handleEditClick = () => {
        setIsEditing(true);
    };
    const handleSaveClick = () => {
        const err = validProfile(userInfo);
        if (err) {
            toastBreak(err, "error");
            return;
        }
        updateUser(user._id, userInfo).then(() => {
            dispatch(getUser());
            setIsEditing(false);
        });
    };
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
    return (
        <Box
            sx={{
                height: "85.8vh",
                textAlign: "left",
                display: "grid",
                gridTemplateRows: "1fr 1fr",
                gridTemplateAreas: `
                "header main"
                "header button"
                "header ."
                "header ."
                `,
            }}>
            {screen && (
                <Box sx={{ gridArea: "header", width: "45vw", height: "80vh" }}>
                    <img src={ringImage} alt="rings" width="128%" height="100%" />
                </Box>
            )}
            <Box
                sx={{
                    gridArea: "main",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gridTemplateAreas: `
                    "head1 head1"
                    "first1 last1"
                    "head2 head2"
                    "first2 last2"
                    "details details"
                    `,
                    width: screen ? "30vw" : "90vw",
                    justifySelf: "center",
                }}>
                <Typography sx={{ mt: 1 }} color={handleColorPallet("teaGreen")} gridArea="head1" variant="h4">
                    First person
                </Typography>
                <Typography variant="h6">
                    First name
                    <Typography variant="body1">
                        {isEditing ? (
                            <EditableTextField value={userInfo?.nameA.first} onChange={handleInputChange} name="nameA" subName="first" />
                        ) : (
                            user?.nameA.first
                        )}
                    </Typography>
                </Typography>
                <Typography variant="h6">
                    Last name
                    <Typography variant="body1">
                        {isEditing ? (
                            <EditableTextField value={userInfo?.nameA.last} onChange={handleInputChange} name="nameA" subName="last" />
                        ) : (
                            user?.nameA.last
                        )}
                    </Typography>
                </Typography>
                <Typography sx={{ mt: 1 }} color={handleColorPallet("teaGreen")} gridArea="head2" variant="h4">
                    Second person
                </Typography>
                <Typography variant="h6">
                    First name
                    <Typography variant="body1">
                        {isEditing ? (
                            <EditableTextField value={userInfo?.nameB.first} onChange={handleInputChange} name="nameB" subName="first" />
                        ) : (
                            user?.nameB.first
                        )}
                    </Typography>
                </Typography>
                {user?.nameB && (
                    <Typography variant="h6">
                        Last name:
                        <Typography variant="body1">
                            {isEditing ? (
                                <EditableTextField value={userInfo?.nameB.last} onChange={handleInputChange} name="nameB" subName="last" />
                            ) : (
                                user?.nameB.last
                            )}
                        </Typography>
                    </Typography>
                )}
                <Typography sx={{ mt: 1 }} color={handleColorPallet("teaGreen")} gridArea="details" variant="h4">
                    Details
                </Typography>
                <Typography variant="h6">
                    Country:
                    <Typography variant="body1">
                        {isEditing ? (
                            <EditableTextField
                                value={userInfo?.address.country}
                                onChange={handleInputChange}
                                name="address"
                                subName="country"
                            />
                        ) : (
                            user?.address.country
                        )}
                    </Typography>
                </Typography>
                <Typography variant="h6">
                    City:
                    <Typography variant="body1">
                        {isEditing ? (
                            <EditableTextField value={userInfo?.address.city} onChange={handleInputChange} name="address" subName="city" />
                        ) : (
                            user?.address.city
                        )}
                    </Typography>
                </Typography>
                <Typography variant="h6">
                    street:
                    <Typography variant="body1">
                        {isEditing ? (
                            <EditableTextField
                                value={userInfo?.address.street}
                                onChange={handleInputChange}
                                name="address"
                                subName="street"
                            />
                        ) : (
                            user?.address.street
                        )}
                    </Typography>
                </Typography>
                <Typography variant="h6">
                    House number:
                    <Typography variant="body1">
                        {isEditing ? (
                            <EditableTextField
                                value={userInfo?.address.houseNumber}
                                onChange={handleInputChange}
                                name="address"
                                subName="houseNumber"
                            />
                        ) : (
                            user?.address.houseNumber
                        )}
                    </Typography>
                </Typography>
                <Typography variant="h6">
                    Zip code:
                    <Typography variant="body1">
                        {isEditing ? (
                            <EditableTextField value={userInfo?.address.Zip} onChange={handleInputChange} name="address" subName="Zip" />
                        ) : (
                            user?.address.Zip
                        )}
                    </Typography>
                </Typography>
                <Typography variant="h6">
                    email:
                    <Typography variant="body1">
                        {isEditing ? <EditableTextField value={userInfo?.email} onChange={handleInputChange} name="email" /> : user?.email}
                    </Typography>
                </Typography>
                <Typography variant="h6">
                    phone:
                    <Typography variant="body1">
                        {isEditing ? <EditableTextField value={userInfo?.phone} onChange={handleInputChange} name="phone" /> : user?.phone}
                    </Typography>
                </Typography>
            </Box>
            <Box sx={{ gridArea: "button", textAlign: "center", height: "9vh", mt: 1 }}>
                {isEditing ? (
                    <Button variant="contained" color="primary" onClick={handleSaveClick}>
                        Save
                    </Button>
                ) : (
                    <Button variant="contained" color="primary" onClick={handleEditClick}>
                        Edit
                    </Button>
                )}
            </Box>
        </Box>
    );
};

export default ProfilePage;
