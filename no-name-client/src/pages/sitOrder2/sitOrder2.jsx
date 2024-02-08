import { Container, Box, Grid, Typography } from "@mui/material";
import TablePhotos from "../sitOrders/tablePhotosDragable";
import roundTable from "../../assets/roundTable.png";
import longTable from "../../assets/longTable.png";
import tableFor8 from "../../assets/tableFor8.png";
import Draggable from "react-draggable";
import { useState } from "react";
const grid = 25;
const SitOrder2 = () => {
    const tablePhotosArr = [
        { src: roundTable, alt: "roundTable", id: 1, dropped: false },
        { src: longTable, alt: "longTable", id: 2, dropped: false },
        { src: tableFor8, alt: "tableFor8", id: 3, dropped: false },
    ];
    const [tablePhotos, setTablePhotos] = useState(tablePhotosArr);
    const handleStop = (e, data, table) => {
        const newTablePhotos = tablePhotos.map((t) =>
            t.id === table.id ? { ...t, x: Math.round(data.x / grid) * grid, y: Math.round(data.y / grid) * grid } : t
        );
        setTablePhotos(newTablePhotos);
        console.log("e", e);
        console.log("data", data);
        console.log("table", table);
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
                    <Box className="draggable-container">
                        {tablePhotos.map((table) => (
                            <Draggable
                                grid={[grid, grid]}
                                bounds=".MuiBox-root"
                                disabled={table.dropped}
                                onStop={(e, data) => handleStop(e, data, table)}
                                key={table.id}
                                position={{ x: table.x, y: table.y }}>
                                <img src={table.src} alt={table.alt} width="100px" height="100px" />
                            </Draggable>
                        ))}
                        <Box
                            sx={{
                                height: "55vh",
                                border: "1px solid",
                                display: "grid",
                                gridTemplateColumns: "repeat(5, 1fr)",
                                gridTemplateRows: "repeat(3, 1fr)",
                            }}></Box>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default SitOrder2;
