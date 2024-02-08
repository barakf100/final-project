import { useDispatch, useSelector } from "react-redux";
import { Container, Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getUser } from "../../store/async/userSlice";
import { DndContext, closestCenter } from "@dnd-kit/core";
import TablePhotos from "./tablePhotosDragable";

import roundTable from "../../assets/roundTable.png";
import longTable from "../../assets/longTable.png";
import tableFor8 from "../../assets/tableFor8.png";
import Droppable from "./tableDropable";
const tablePhotos = [
    { src: roundTable, alt: "roundTable", id: 1, dropped: false },
    { src: longTable, alt: "longTable", id: 2, dropped: false },
    { src: tableFor8, alt: "tableFor8", id: 3, dropped: false },
    { src: tableFor8, alt: "tableFor8", id: 4, dropped: false },
];
const SitOrder = () => {
    const [items, setItems] = useState(tablePhotos);
    const [droppedItems, setDroppedItems] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);
    const user = useSelector((state) => state.userSlice.user);
    const handleDragEnd = (event) => {
        console.log("event", event);
        const { active, over } = event;

        if (active && over && active.id !== over.id) {
            setItems((items) => {
                const newArray = Array.from(items);
                const activeItem = newArray.find((item) => item.id === active.id);
                const removed = newArray.splice(newArray.indexOf(activeItem), 1)[0];
                removed.dropped = true;
                console.log("removed", removed);
                if (over.id === "droppable") {
                    if (droppedItems.length >= 14) return newArray;
                    const rect = over.rect.rect;
                    const activeRect = active.rect.current.translated;
                    const cellWidth = rect.width / 5;
                    const cellHeight = rect.height / 3;
                    const cellX = Math.floor((activeRect.left - rect.left) / cellWidth);
                    const cellY = Math.floor((activeRect.top - rect.top) / cellHeight);
                    const putInCell = cellY * 5 + cellX;

                    setDroppedItems((droppedItems) => {
                        const newDroppedItems = Array.from(droppedItems);
                        removed.cellX = cellX;
                        removed.cellY = cellY;
                        newDroppedItems.splice(putInCell, 0, removed);
                        return newDroppedItems;
                    });
                    return newArray;
                } else {
                    const newIndex = items.findIndex((item) => item.id === over.id);
                    newArray.splice(newIndex, 0, removed);
                    return newArray;
                }
            });
        }
    };
    return (
        <Container maxWidth="xl" sx={{ height: "80vh", textAlign: "center" }}>
            {/* <Typography variant="h4">SitOrder</Typography> */}
            <Grid container spacing={2}>
                <Grid item xs={3} sx={{ height: "80vh" }}>
                    <Box sx={{ height: "40vh" }}>
                        <Typography variant="h4">Invites</Typography>
                    </Box>
                </Grid>
                <Grid item xs={8} sx={{ height: "80vh" }}>
                    <Typography mb={2} variant="h4">
                        Tables
                    </Typography>
                    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
                        {items.map((table) => (
                            <TablePhotos tablePhotos={table} />
                        ))}
                        <Droppable>
                            {droppedItems.map((item, index) => (
                                <TablePhotos
                                    key={item.id}
                                    tablePhotos={item}
                                    style={{ gridColumn: item.cellX + 1, gridRow: item.cellY + 1 }}
                                />
                            ))}
                        </Droppable>
                    </DndContext>
                </Grid>
            </Grid>
        </Container>
    );
};

export default SitOrder;
