import { PieChart } from "@mui/x-charts/PieChart";
import { Typography } from "@mui/material";
import { handleColorPallet } from "../../../service/colors/change";
import { useTheme } from "@mui/material/styles";
const UsersPie = ({ valA, valB, valC, labelA, labelB, labelC, title }) => {
    const theme = useTheme();
    const colors = [
        `${handleColorPallet("cornsilk")(theme)}`,
        `${handleColorPallet("teaGreen")(theme)}`,
        `${handleColorPallet("mossGreen1")(theme)}`,
    ];
    return (
        <>
            <Typography textAlign="center" variant="h5" mb={3}>
                {title}
            </Typography>
            <PieChart
                colors={colors}
                series={[
                    {
                        data: [
                            { id: 0, value: Number(valA), label: labelA },
                            { id: 1, value: Number(valB), label: labelB },
                            { id: 2, value: Number(valC), label: labelC },
                        ],
                    },
                ]}
                width={400}
                height={250}
            />
        </>
    );
};
export default UsersPie;
