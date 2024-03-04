import * as Mui from "@mui/material";
import EditableTextField from "../../profile/styled/styledTextField";
const EditUser = ({ userInfo, handleChange, name, subName }) => {
    return (
        <Mui.TableCell sx={{ "& input": { textAlign: "center !important", borderBottom: "1px solid " } }}>
            <EditableTextField value={userInfo} onChange={handleChange} name={name} subName={subName} />
        </Mui.TableCell>
    );
};
export default EditUser;
