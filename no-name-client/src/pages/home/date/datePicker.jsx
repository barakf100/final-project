import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { setMarryDate } from "../../../service/request/marryReq";
import dayjs from "dayjs";

const DatePickerValue = ({ open, setOpen, value, setValue, id }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                open={open}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                value={value}
                onChange={(newValue) => {
                    setValue(newValue);
                    setMarryDate(id, dayjs(newValue));
                }}
                sx={{ display: "none" }}
            />
        </LocalizationProvider>
    );
};
export { DatePickerValue };
