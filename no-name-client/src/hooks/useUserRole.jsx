import { useSelector } from "react-redux";

const useUserRole = () => {
    return useSelector((bigPie) => bigPie.authSlice.type);
};

export default useUserRole;
