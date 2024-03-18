import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { getMyId } from "../../../service/storage/storageService";
import invitationReq from "../../../service/request/invitationReq";
import { allToast } from "../../../service/toast/toast";

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

const handleUpload = async (event, setReload) => {
    try {
        const userId = getMyId();
        const file = event.target.files[0];
        if (file.type.startsWith("image")) {
            await invitationReq.createInvitation(userId, file);
            setReload((prev) => !prev);
        } else allToast.toastError("Please upload an image file");
    } catch (err) {
        console.log(err);
    }
};
const handleDelete = async (setReload) => {
    try {
        const userId = getMyId();
        invitationReq.deleteInvitation(userId);
        setReload((prev) => !prev);
        allToast.toastSuccess("Invitation deleted!");
    } catch (err) {
        console.log(err);
    }
};

const InputFileUpload = ({ setReload, invitation }) => {
    return (
        <>
            <Button component="label" role={undefined} variant="contained" tabIndex={-1} startIcon={<CloudUploadIcon />} sx={{ mr: 1 }}>
                Upload file
                <VisuallyHiddenInput
                    type="file"
                    onChange={(e) => {
                        handleUpload(e, setReload);
                    }}
                />
            </Button>
            <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<DeleteIcon />}
                disabled={!invitation}
                onClick={() => {
                    handleDelete(setReload);
                }}>
                delete
            </Button>
        </>
    );
};

export default InputFileUpload;
