import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { getMyId } from "../../../service/storage/storageService";
import invitationReq from "../../../service/request/invitationReq";

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
        const res = await invitationReq.createInvitation(userId, file);
        console.log(res);
        setReload((prev) => !prev);
    } catch (err) {
        console.log(err);
    }
};

const InputFileUpload = ({ setReload }) => {
    return (
        <Button component="label" role={undefined} variant="contained" tabIndex={-1} startIcon={<CloudUploadIcon />}>
            Upload file
            <VisuallyHiddenInput
                type="file"
                onChange={(e) => {
                    handleUpload(e, setReload);
                }}
            />
        </Button>
    );
};

export default InputFileUpload;
