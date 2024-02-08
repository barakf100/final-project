import { Box } from "@mui/material";
import { useDraggable } from "@dnd-kit/core";

const TablePhotos = ({ tablePhotos, style: gridStyle }) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: tablePhotos.id });
    const dragStyle = isDragging && transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` } : undefined;
    const style = { ...dragStyle, ...gridStyle };
    return (
        <Box ref={setNodeRef} {...listeners} {...attributes} style={style} sx={{ display: "inline-block", m: 2 }}>
            <img src={tablePhotos.src} alt="table" width="90px" height="90px" />
        </Box>
    );
};

export default TablePhotos;
