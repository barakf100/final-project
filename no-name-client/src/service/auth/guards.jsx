import useUserRole from "../../hooks/useUserRole";
import { allToast } from "../toast/toast";
import { Navigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";

const Guards = {
    MarryGuard: ({ children }) => {
        const type = useUserRole();
        if (type === "marry") {
            return children;
        } else {
            allToast.toastError("You are not authorized to view this page");
            return <Navigate to={ROUTES.HOME} />;
        }
    },
    CallerGuard: ({ children }) => {
        const type = useUserRole();
        if (type === "caller") {
            return children;
        } else {
            allToast.toastError("You are not authorized to view this page");
            return <Navigate to={ROUTES.HOME} />;
        }
    },
    CallerOrAdminGuard: ({ children }) => {
        const type = useUserRole();
        if (type === "caller" || type === "admin") {
            return children;
        } else {
            allToast.toastError("You are not authorized to view this page");
            return <Navigate to={ROUTES.HOME} />;
        }
    },
    AdminGuard: ({ children }) => {
        const type = useUserRole();
        if (type === "admin") {
            return children;
        } else {
            allToast.toastError("You are not authorized to view this page");
            return <Navigate to={ROUTES.HOME} />;
        }
    },
};
export default Guards;
