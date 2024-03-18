import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Fragment } from "react";
import validateTDL from "../../../validation/tdlValid";
import { toastBreak } from "../../../service/toast/toast";
import { handleColorPallet } from "../../../service/colors/change";

export default function AddTDL({ open, setOpen, handleAddTDL }) {
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: "form",
                    onSubmit: (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        const name = formJson.name;
                        const description = formJson.description;
                        const tdl = { name: name, description: description, isCompleted: false };
                        const err = validateTDL(tdl);
                        if (err) {
                            toastBreak(err, "error");
                        } else {
                            handleAddTDL(tdl);
                            handleClose();
                        }
                    },
                }}>
                <DialogTitle>Add TDL</DialogTitle>
                <DialogContent>
                    <TextField autoFocus required margin="dense" id="name" name="name" label="Name" fullWidth variant="standard" />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="description"
                        name="description"
                        label="Description"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button sx={{ color: handleColorPallet("mossGreen3") }} onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button sx={{ color: handleColorPallet("mossGreen3") }} type="submit">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}
