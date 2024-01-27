import { styled, TextField } from "@mui/material";
const StyledTextField = styled(TextField)({
    "& fieldset": {
        borderWidth: "0",
    },
    "& Input": {
        textAlign: "left",
        height: "0.1rem",
    },
});
const EditableTextField = ({ value, onChange, name, subName }) => (
    <StyledTextField
        value={value}
        onChange={(e) => (subName ? onChange(name, subName, e.target.value) : onChange(name, null, e.target.value))}
    />
);

export default EditableTextField;
