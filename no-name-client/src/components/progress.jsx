import Box from "@mui/material/Box";
import { handleColorPallet } from "../service/colors/change";

const MyProgressBar = ({ invitesStatus }) => {
    const accept = invitesStatus?.acceptedInvites.length;
    const pending = invitesStatus?.pendingInvites.length;
    const decline = invitesStatus?.declinedInvites.length;
    const total = accept + pending + decline;
    return (
        <Box display="flex" alignItems="center" height={25} borderRadius={5} bgcolor="grey.300" overflow="hidden">
            {accept !== 0 && (
                <Box flexBasis={`${(accept / total) * 100}%`} bgcolor={handleColorPallet("mossGreen1")}>{`${(accept / total) * 100}%`}</Box>
            )}
            {pending !== 0 && (
                <Box flexBasis={`${(pending / total) * 100}%`} bgcolor={handleColorPallet("beige")}>{`${(pending / total) * 100}%`}</Box>
            )}
            {decline !== 0 && (
                <Box flexBasis={`${(decline / total) * 100}%`} bgcolor={handleColorPallet("mossGreen3")}>{`${
                    (decline / total) * 100
                }%`}</Box>
            )}
        </Box>
    );
};

export { MyProgressBar };
