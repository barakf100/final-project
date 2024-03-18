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
import CallerPage from "../pages/callerMain/callerPage";
import UserInvites from "../pages/userInvites/userInvitesPage";
import CallerProfilePage from "../pages/callerProfile/callerProfile";
import InvitesPage from "../pages/invites/invites";
import Messages from "../pages/message/message";
import Invitation from "../pages/invitation/invitation";
import AdminMain from "../pages/adminMain/adminMain";
import WeddingCal from "../pages/weddingCalander/weddingCal";
import Guards from "../service/auth/guards";
import useUserRole from "../hooks/useUserRole";
const AppRouter = () => {
    const userType = useUserRole();
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
                    <Guards.AdminGuard>
                        <Users />
                    </Guards.AdminGuard>
                }
            />
            <Route
                path={ROUTES.WEDDINGCALENDER}
                element={
                    <Guards.CallerOrAdminGuard>
                        <WeddingCal />
                    </Guards.CallerOrAdminGuard>
                }
            />
            <Route
                path={ROUTES.PROFILE}
                element={
                    <Guards.MarryGuard>
                        <ProfilePage />
                    </Guards.MarryGuard>
                }
            />
            <Route
                path={ROUTES.INVITES}
                element={
                    <Guards.CallerGuard>
                        <UserInvites />
                    </Guards.CallerGuard>
                }
            />
            <Route
                path={ROUTES.INVITEPAGE}
                element={
                    <Guards.MarryGuard>
                        <InvitesPage />
                    </Guards.MarryGuard>
                }
            />
            <Route
                path={ROUTES.CALLERPROFILE}
                element={
                    <Guards.CallerGuard>
                        <CallerProfilePage />
                    </Guards.CallerGuard>
                }
            />
            <Route
                path={ROUTES.INVITATION}
                element={
                    <Guards.MarryGuard>
                        <Invitation />
                    </Guards.MarryGuard>
                }
            />
            <Route
                path={ROUTES.MESSAGES}
                element={
                    <Guards.MarryGuard>
                        <Messages />
                    </Guards.MarryGuard>
                }
            />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default AppRouter;
