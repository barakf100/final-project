import React from "react";
import { Routes, Route } from "react-router-dom";

import NotFoundPage from "../pages/404/404";
import About from "../pages/about/about";
import HomePage from "../pages/home/home";
import ROUTES from "./ROUTES";

const AppRouter = () => {
    return (
        <Routes>
            <Route path={ROUTES.HOME} element={<HomePage />} />
            <Route path={ROUTES.ABOUT} element={<About />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default AppRouter;
