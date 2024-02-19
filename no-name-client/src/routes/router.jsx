import React from "react";
import { Routes, Route } from "react-router-dom";

import NotFoundPage from "../pages/404/404";
import About from "../pages/about/about";
import HomePage from "../pages/home/home";
import ROUTES from "./ROUTES";
import Login from "../pages/login/login";
import Users from "../pages/users/users";
import ProfilePage from "../pages/profile/profile";
import Register from "../pages/register/register";
import { useSelector } from "react-redux";
import CallerPage from "../pages/callerMain/callerPage";
import UserInvites from "../pages/userInvites/userInvitesPage";
import CallerProfilePage from "../pages/callerProfile/callerProfile";
import SitOrder from "../pages/sitOrders/sitOreder";
import SitOrder2 from "../pages/sitOrder2/sitOrder2";
import InvitesPage from "../pages/invites/invites";
import Messages from "../pages/message/message";
import Invitation from "../pages/invitation/invitation";
import AllGuards from "../service/auth/allGuards";
import AdminMain from "../pages/adminMain/adminMain";
const AppRouter = () => {
    const userType = useSelector((bigPie) => bigPie.authSlice.type);
    return (
        <Routes>
            <Route
                path={ROUTES.HOME}
                element={
                    userType === "marry" ? (
                        <HomePage />
                    ) : userType === "caller" ? (
                        <CallerPage />
                    ) : userType === "admin" ? (
                        <AdminMain />
                    ) : (
                        <Login />
                    )
                }
            />
            <Route path={ROUTES.ABOUT} element={<About />} />
            <Route path={ROUTES.REGISTER} element={<Register />} />
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route
                path={ROUTES.USERS}
                element={
                    <AllGuards who="admin">
                        <Users />
                    </AllGuards>
                }
            />
            <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
            <Route path={ROUTES.INVITES} element={<UserInvites />} />
            <Route path={ROUTES.INVITEPAGE} element={<InvitesPage />} />
            <Route path={ROUTES.CALLERPROFILE} element={<CallerProfilePage />} />
            <Route path={ROUTES.INVITATION} element={<Invitation />} />
            <Route path={ROUTES.MESSAGES} element={<Messages />} />
            <Route path={ROUTES.SITORDER} element={<SitOrder />} />
            <Route path={ROUTES.SITORDER2} element={<SitOrder2 />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default AppRouter;
