import React from "react";
import image404 from "../../assets/404.jpeg";
import ButtonComp from "../../components/button-comp";
import ROUTES from "../../routes/ROUTES";

const NotFoundPage = () => {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            <img src={image404} width={360} alt="shit don't work" />
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <ButtonComp variant="text" color="secondary" children="HOME" size="large" href={ROUTES.HOME} />
        </div>
    );
};

export default NotFoundPage;
