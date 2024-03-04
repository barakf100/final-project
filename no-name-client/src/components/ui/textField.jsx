import * as Mui from "@mui/material";
const StyledTextField = Mui.styled(Mui.TextField)({
    "& fieldset": {
        borderWidth: "0",
    },
    "& Input": {
        textAlign: "left",
        height: "0.1rem",
        borderBottom: `.5px solid`,
    },
});
const MyTextField = ({ onChange, name, subName }) => (
    <StyledTextField onChange={(e) => (subName ? onChange(name, subName, e.target.value) : onChange(name, null, e.target.value))} />
);
const MyTableCell = Mui.styled(Mui.TableCell)({
    "& .MuiInputBase-root": {
        textAlign: "center",
        padding: "0",
    },
});
export { MyTableCell, MyTextField };
