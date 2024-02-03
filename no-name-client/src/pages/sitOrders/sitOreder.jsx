import { useDispatch, useSelector } from "react-redux";
import { Container, Box } from "@mui/material";
import { useEffect } from "react";
import { getUser } from "../../store/async/userSlice";
import Draggable from "react-draggable";
const SitOrder = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);
    const user = useSelector((state) => state.userSlice.user);
    return (
        <Container sx={{ display: "grid" }}>
            <Draggable>
                <Box>
                    <h1>SitOrder</h1>
                    <h2>{user?.nameA?.first}</h2>
                </Box>
            </Draggable>
        </Container>
    );
};

export default SitOrder;
