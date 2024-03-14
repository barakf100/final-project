import { Login } from "@mui/icons-material";
import AdminMain from "../pages/adminMain/adminMain";
import CallerPage from "../pages/callerMain/callerPage";
import HomePage from "../pages/home/home";

const HomePageNav = (type) => {
    return type === "marry" ? <HomePage /> : type === "caller" ? <CallerPage /> : type === "admin" ? <AdminMain /> : <Login />;
};
export default HomePageNav;
