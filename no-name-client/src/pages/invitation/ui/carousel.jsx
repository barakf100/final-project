import Carousel from "react-material-ui-carousel";
import imageList from "./imageList";
import * as Mui from "@mui/material";
const Item = ({ item }) => {
    return (
        <Mui.Paper>
            <Mui.Link href={item.link} target="_blank" rel="noopener">
                <img style={{ border: "3px solid" }} src={item.src} alt={item.alt} height="494px" width="73%" />
            </Mui.Link>
        </Mui.Paper>
    );
};
const CarouselComponent = () => {
    return (
        <Carousel
            className="carousel"
            sx={{
                height: "71vh",
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
