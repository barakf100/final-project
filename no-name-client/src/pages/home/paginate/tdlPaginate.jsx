import { useEffect, useState } from "react";
import { Box, Checkbox, FormControlLabel, Button, Tooltip } from "@mui/material";
import nextKey from "generate-my-key";
import { TDLDone } from "../../../service/request/TDLReq";
const ITEM_PER_PAGE = 3;
const TDLPaginate = ({ TDL, setOpen, userId, setReload, done }) => {
    const [page, setPage] = useState(0);
    const [doneTDLs, setDoneTDLs] = useState([]);
    const [undoneTDLs, setUndoneTDLs] = useState([]);
    useEffect(() => {
        const done = TDL.filter((tdl) => tdl.isCompleted === true);
        const undone = TDL.filter((tdl) => tdl.isCompleted === false);
        setDoneTDLs(done);
        setUndoneTDLs(undone);
    }, [TDL]);
    // const PaginateTDL = TDL.slice(page * ITEM_PER_PAGE, (page + 1) * ITEM_PER_PAGE);
    const paginateDoneTDLs = doneTDLs.slice(page * ITEM_PER_PAGE, (page + 1) * ITEM_PER_PAGE);
    const paginateUndoneTDLs = undoneTDLs.slice(page * ITEM_PER_PAGE, (page + 1) * ITEM_PER_PAGE);

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
    const handleCheck = async (e, tdlId) => {
        const done = await TDLDone(userId, tdlId);
        setReload((state) => !state);
    };
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "3px", height: "225px", justifyContent: "space-between" }}>
            {done
                ? paginateDoneTDLs.map((tdl) => (
                      <Tooltip title={tdl?.description}>
                          <FormControlLabel
                              key={nextKey()}
                              control={<Checkbox checked={tdl.isCompleted} onClick={(e) => handleCheck(e, tdl._id)} color="mossGreen1" />}
                              label={tdl.name}
                          />
                      </Tooltip>
                  ))
                : paginateUndoneTDLs.map((tdl) => (
                      <Tooltip title={tdl?.description}>
                          <FormControlLabel
                              key={nextKey()}
                              control={<Checkbox checked={tdl.isCompleted} onClick={(e) => handleCheck(e, tdl._id)} color="mossGreen1" />}
                              label={tdl.name}
                          />
                      </Tooltip>
                  ))}
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button color="mossGreen1" onClick={handlePreviousPage}>
                    Previous
                </Button>
                <Button color="mossGreen1" onClick={handleNextPage}>
                    Next
                </Button>
                {!done ? (
                    <Button
                        color="mossGreen1"
                        onClick={() => {
                            setOpen(true);
                        }}>
                        Add
                    </Button>
                ) : null}
            </Box>
        </Box>
    );
};
export default TDLPaginate;
