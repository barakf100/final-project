import { useDroppable } from "@dnd-kit/core";
import { Box } from "@mui/material";
const Droppable = ({ children }) => {
    const { isOver, setNodeRef } = useDroppable({
        id: "droppable",
    });
    const style = {
        color: isOver ? "green" : undefined,
    };

    return (
        <Box
            ref={setNodeRef}
            style={style}
            sx={{
                height: "55vh",
                border: "1px solid",
                display: "grid",
                gridTemplateColumns: "repeat(5,1fr)",
                gridTemplateRows: "repeat(3,1fr)",
                gridAutoColumns: 0,
                gridAutoRows: 0,
            }}>
            {children}
        </Box>
    );
};

export default Droppable;
