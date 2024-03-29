import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import nextKey from "generate-my-key";
const ITEM_PER_PAGE = 3;
const InviteStatusPaginate = ({ invites }) => {
    const [page, setPage] = useState(0);
    if (!invites) return <div>loading...</div>;
    const PaginateInvites = invites.slice(page * ITEM_PER_PAGE, (page + 1) * ITEM_PER_PAGE);
    const handleNextPage = () => {
        if ((page + 1) * ITEM_PER_PAGE < invites.length) {
            setPage(page + 1);
        }
    };
    const handlePreviousPage = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "3px", height: "225px", justifyContent: "space-between" }}>
            {PaginateInvites.map((invites) => (
                <Typography key={nextKey()}>{invites.name.first}</Typography>
            ))}
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button color="mossGreen1" onClick={handlePreviousPage}>
                    Previous
                </Button>
                <Button color="mossGreen1" onClick={handleNextPage}>
                    Next
                </Button>
            </Box>
        </Box>
    );
};
export default InviteStatusPaginate;
