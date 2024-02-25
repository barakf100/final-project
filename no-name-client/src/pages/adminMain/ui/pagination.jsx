import * as Mui from "@mui/material";
import { useState } from "react";
import { handleColorPallet } from "../../../service/colors/change";
import AddTDL from "../../home/addTDL/addTDL";
const ITEM_PER_PAGE = 3;
const Paginate = ({ items, handleOpen, setCallerId, open, setOpen, handleAddTDL, title, who }) => {
    const [page, setPage] = useState(0);
    const paginateItems = items?.slice(page * ITEM_PER_PAGE, (page + 1) * ITEM_PER_PAGE);
    const handleNextPage = () => {
        if ((page + 1) * ITEM_PER_PAGE < items.length) {
            setPage(page + 1);
        }
    };
    const handlePreviousPage = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };
    return (
        <Mui.Box sx={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between" }}>
            <Mui.Typography textAlign="center" variant="h5">
                {title} list
            </Mui.Typography>
            <Mui.Box sx={{ marginBottom: "auto" }}>
                {paginateItems?.map((paginateItems) => (
                    <Mui.Grid container spacing={1} key={paginateItems._id} sx={{ p: 1 }}>
                        <Mui.Grid item xs={4}>
                            <Mui.Avatar src={paginateItems.image.src} />
                        </Mui.Grid>
                        <Mui.Grid item xs={4} alignSelf="center">
                            <Mui.Typography variant="body1">
                                {paginateItems.nameA.first} {paginateItems.nameA.last}
                            </Mui.Typography>
                        </Mui.Grid>
                        <Mui.Grid item xs={4} alignSelf="center">
                            {who === "caller" ? (
                                <Mui.Button
                                    sx={{ color: handleColorPallet("teaGreen") }}
                                    onClick={() => {
                                        handleOpen();
                                        setCallerId(paginateItems._id);
                                    }}>
                                    Add a TDL
                                </Mui.Button>
                            ) : null}
                            {who === "caller" ? <AddTDL open={open} setOpen={setOpen} handleAddTDL={handleAddTDL} /> : null}
                        </Mui.Grid>
                    </Mui.Grid>
                ))}
            </Mui.Box>
            <Mui.Box sx={{ display: "flex", justifyContent: "center" }}>
                <Mui.Button color="mossGreen1" onClick={handlePreviousPage}>
                    Previous
                </Mui.Button>
                <Mui.Button color="mossGreen1" onClick={handleNextPage}>
                    Next
                </Mui.Button>
            </Mui.Box>
        </Mui.Box>
    );
};

export default Paginate;
