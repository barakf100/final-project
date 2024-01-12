import { Typography, Box } from "@mui/material";
import "../../fonts.css";
import imageRing from "../../assets/ringFlowerGlass.jpeg";
import ButtonComp from "../../components/button-comp";
import { useEffect, useState } from "react";
import { JWTDecode, getToken } from "../../service/storage/storageService";
import { getUserById } from "../../service/request/marryReq";
const HomePage = () => {
    const [user, setUser] = useState(null);
    const { _id } = JWTDecode(getToken());
    useEffect(() => {
        const fetchUser = async () => {
            const { user: usr } = await getUserById(_id);
            setUser(usr);
        };
        fetchUser();
    }, [_id]);
    console.log(user);
    return (
        <div>
            <Typography variant="h3" textAlign="center" marginBottom="25px">
                Welcome to the Home Page
            </Typography>
            <ButtonComp variant="text" color="primary" children={"click"} />
            <Box style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
                <Box
                    style={{
                        height: "210px",
                        gridRow: "1 / 3",
                        fontFamily: "Salsa",
                        backgroundImage: `url(${imageRing})`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        fontSize: "1.3rem",
                        color: "white",
                    }}>
                    Cheers to the beginning of your wonderful journey! Welcome to our wedding planning app—where dreams come true, one
                    detail at a time.
                </Box>
                <Box style={{ display: "flex", gap: "10px", height: "100px" }}>
                    <Box style={{ backgroundColor: "blue", flex: "1" }}>pending number</Box>
                    <Box style={{ backgroundColor: "teal", flex: "1" }}>approved number</Box>
                    <Box style={{ backgroundColor: "purple", flex: "1" }}>invites number</Box>
                </Box>
                <Box style={{ backgroundColor: "green", height: "100px", gridRow: "2" }}>progress %</Box>
                <Box style={{ backgroundColor: "orange", height: "210px", gridColumn: "3 / 3", gridRow: "1 / 3" }}>
                    {user?.nameA.first} {user?.nameA.last}
                </Box>
                <Box style={{ backgroundColor: "teal", height: "450px" }}>groups</Box>
                <Box style={{ backgroundColor: "brown", height: "450px" }}>status of all</Box>
                <Box style={{ backgroundColor: "pink", height: "450px" }}>TDL</Box>
            </Box>
        </div>
    );
};

export default HomePage;
