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
                <Box flexBasis={`${Math.round((accept / total) * 100)}%`} bgcolor={handleColorPallet("mossGreen1")}>{`${Math.round(
                    (accept / total) * 100
                )}%`}</Box>
            )}
            {pending !== 0 && (
                <Box flexBasis={`${Math.round((pending / total) * 100)}%`} bgcolor={handleColorPallet("beige")}>{`${Math.round(
                    (pending / total) * 100
                )}%`}</Box>
            )}
            {decline !== 0 && (
                <Box flexBasis={`${Math.round((decline / total) * 100)}%`} bgcolor={handleColorPallet("mossGreen3")}>{`${Math.round(
                    (decline / total) * 100
                )}%`}</Box>
            )}
        </Box>
    );
};

export { MyProgressBar };
