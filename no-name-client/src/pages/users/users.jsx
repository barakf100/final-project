import React, { useEffect } from "react";
import { getUsers } from "../../store/async/usersSlice";
import { useDispatch, useSelector } from "react-redux";

const Users = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);
    const users = useSelector((state) => state.usersSlice.users);
    return (
        <div>
            <h1>All Users</h1>
            <ul>
                {users.map((user) => (
                    <li key={user._id}>
                        {user.nameA.first}-{user.nameA.last}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Users;
