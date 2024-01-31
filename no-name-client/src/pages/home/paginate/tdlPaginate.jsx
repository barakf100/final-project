import { useState } from "react";
import { Box, Checkbox, FormControlLabel, Button } from "@mui/material";
import nextKey from "generate-my-key";
const ITEM_PER_PAGE = 3;
const TDLPaginate = ({ TDL, setOpen }) => {
    const [page, setPage] = useState(0);
    const PaginateTDL = TDL.slice(page * ITEM_PER_PAGE, (page + 1) * ITEM_PER_PAGE);
    const handleNextPage = () => {
        if ((page + 1) * ITEM_PER_PAGE < TDL.length) {
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
            {PaginateTDL.map((tdl) => (
                <FormControlLabel key={nextKey()} control={<Checkbox color="mossGreen1" />} label={tdl.name} />
            ))}
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button color="mossGreen1" onClick={handlePreviousPage}>
                    Previous
                </Button>
                <Button color="mossGreen1" onClick={handleNextPage}>
                    Next
                </Button>
                <Button
                    color="mossGreen1"
                    onClick={() => {
                        setOpen(true);
                    }}>
                    Add
                </Button>
            </Box>
        </Box>
    );
};
export default TDLPaginate;
