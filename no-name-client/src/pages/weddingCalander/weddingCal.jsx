import * as Mui from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const WeddingCal = () => {
    const [events, setEvents] = useState([]);
    const users = useSelector((state) => state.usersSlice.users);
    useEffect(() => {
        const marryUsers = users.filter((user) => user.isMarrying);
        const userToCal = marryUsers.map((user) => {
            return {
                title: user.nameA.first,
                date: user.marryDate,
            };
        });
        setEvents(userToCal);
    }, [users]);
    const handleDateClick = (arg) => {
        alert(arg.dateStr);
    };
    return (
        <Mui.Container>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                height="82vh"
                events={events}
                displayEventTime={false}
                dateClick={handleDateClick}
            />
        </Mui.Container>
    );
};
export default WeddingCal;
