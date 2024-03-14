import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import { handleColorPallet } from "../../../service/colors/change";
import { setNameB } from "../../../service/request/marryReq";
import validatePartner from "../../../validation/parterValid";
import { allToast } from "../../../service/toast/toast";
const NamePickerDialog = ({ openTextField, setOpenTextField, id, name, setName, setReload }) => {
    const handleChange = (event) => {
        setName({
            ...name,
            [event.target.id]: event.target.value,
        });
    };
    const handleSave = async () => {
        if (!name.middle) name.middle = "";
        const error = validatePartner({ name });
        console.log(error);
        if (error) {
            allToast.toastError(error.first || error.last);
        }
        await setNameB(id, name);
        setOpenTextField(false);
        setReload((prev) => !prev);
    };
    return (
        <React.Fragment>
            <Dialog
                open={openTextField}
                onOpen={() => setOpenTextField(true)}
                onClose={() => setOpenTextField(false)}
                PaperProps={{
                    component: "form",
                }}>
                <DialogContent>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="first"
                            name="First name"
                            label="First name"
                            variant="standard"
                            onChange={handleChange}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="Middle"
                            name="Middle name"
                            label="Middle name"
                            variant="standard"
                            onChange={handleChange}
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="last"
                            name="Last name"
                            label="Last name"
                            variant="standard"
                            onChange={handleChange}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button sx={{ color: handleColorPallet("mossGreen1") }} onClick={() => setOpenTextField(false)}>
                        Cancel
                    </Button>
                    <Button
                        sx={{ color: handleColorPallet("mossGreen1") }}
                        onClick={
                            handleSave
                            //     async () => {
                            //     await setNameB(id, name);
                            //     setOpenTextField(false);
                            //     setReload((prev) => !prev);
                            // }
                        }>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export { NamePickerDialog };
