import { useSelector } from "react-redux";
import { allToast } from "../toast/toast";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";

const AllGuards = ({ children, who }) => {
    const type = useSelector((bigPie) => bigPie.authSlice.type);
    const navigate = useNavigate();
    if (type === who) return children;
    else if (type !== "")
        return (
            navigate(ROUTES.HOME),
            allToast.toastError(`You are not authorized to view this page. Please log in as a ${who} to view this page.`)
        );
    else
        return (
            navigate(ROUTES.LOGIN),
            allToast.toastError(`You are not authorized to view this page. Please log in as a ${who} to view this page.`)
        );
};
export default AllGuards;
