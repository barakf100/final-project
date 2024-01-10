import axios from "axios";
const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJlZ0ByZWcuY29tIiwiaWF0IjoxNzA0MTM1NTg1fQ.Lsc10zoCo2mDz6-x5M7V7UPZt0Xcrv6zIP2Nu9E1Mo4";
const getAllUsers = async () => {
    try {
        const res = await axios.get("/users/", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

export { getAllUsers };
