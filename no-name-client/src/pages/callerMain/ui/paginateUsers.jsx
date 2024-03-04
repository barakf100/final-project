import { useState } from "react";
import { Box, Button, Typography, Avatar } from "@mui/material";
import nextKey from "generate-my-key";
import { handleColorPallet } from "../../../service/colors/change";
const ITEM_PER_PAGE = 9;
const UsersPaginate = ({ users, handleAvatarClick, screenBreak }) => {
    const [page, setPage] = useState(0);
    const PaginateUsers = users.slice(page * ITEM_PER_PAGE, (page + 1) * ITEM_PER_PAGE);
    const handleNextPage = () => {
        if ((page + 1) * ITEM_PER_PAGE < users.length) {
            setPage(page + 1);
        }
    };
    const handlePreviousPage = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };
    return (
        <>
            <Typography mb={1} variant="h5">
                Users
            </Typography>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 1,
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    height: "64vh",
                    width: screenBreak ? "80vw" : "45vw",
                    border: `.9px solid`,
                    borderRadius: "10px",
                    borderColor: handleColorPallet("teaGreen"),
                    px: "15px",
                    paddingTop: "10px",
                }}>
                {PaginateUsers.map((user) => (
                    <Box key={nextKey()} sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 1, height: "100px" }}>
                        <Avatar
                            alt="user avatar"
                            src={user.image?.src}
                            sx={{ mx: 3, width: "50px", height: "50px", cursor: "pointer" }}
                            onClick={() => {
                                handleAvatarClick(user.nameA.first, user.nameB?.first, user._id);
                            }}
                        />
                        <Typography variant="h7" sx={{ mx: 3 }}>
                            {user.nameA?.first}-{user.nameB?.first}
                        </Typography>
                    </Box>
                ))}
                <Box sx={{ display: "flex", justifyContent: "center", height: "35px", alignSelf: "end", gridColumn: 2 }}>
                    <Button sx={{ height: "30px" }} color="mossGreen1" onClick={handlePreviousPage}>
                        Previous
                    </Button>
                    <Button sx={{ height: "30px" }} color="mossGreen1" onClick={handleNextPage}>
                        Next
                    </Button>
                </Box>
            </Box>
        </>
    );
};
export default UsersPaginate;
