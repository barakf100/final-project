import Carousel from "react-material-ui-carousel";
import imageList from "./imageList";
import * as Mui from "@mui/material";
const Item = ({ item }) => {
    const screen = Mui.useMediaQuery("(min-width:1200px)");
    const screenMobile = Mui.useMediaQuery("(min-width:700px)");
    return (
        <Mui.Paper border={1}>
            <Mui.Link href={item.link} target="_blank" rel="noopener">
                <img
                    style={{ border: "3px solid", height: "71vh" }}
                    src={item.src}
                    alt={item.alt}
                    width={screen ? "73%" : screenMobile ? `50%` : "75%"}
                />
            </Mui.Link>
        </Mui.Paper>
    );
};
const CarouselComponent = ({ screenBreak }) => {
    return (
        <Carousel
            className="carousel"
            sx={{
                height: "72vh",
                Button: {
                    backgroundColor: "transparent",
                    color: "black",
                    ":hover": { color: "white" },
                },
                boxShadow: "none",
            }}
            indicators={false}
            navButtonsAlwaysVisible={true}>
            {imageList.map((image, index) => (
                <Item key={index} item={image} />
            ))}
        </Carousel>
    );
};

export default CarouselComponent;
