import { toast } from "react-toastify";
const allToast = {
    toastSuccess: (msg) => {
        toast.success(msg, {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    },
    toastError: (msg) => {
        toast.error(msg, {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    },
};
const toastBreak = (msg, type) => {
    if (type === "success") {
        Object.entries(msg).forEach(([key, value]) => {
            allToast.toastSuccess(`${key} : ${value}`);
        });
    } else if (type === "error") {
        Object.entries(msg).forEach(([key, value]) => {
            allToast.toastError(`${key} : ${value}`);
        });
    }
};
export { allToast, toastBreak };
