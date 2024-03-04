import * as Mui from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import { removeUser } from "../../../service/request/adminReq";
const UserPaginate = ({ page, sortedUsers, ITEM_PER_PAGE, setReload, tableScreenSize }) => {
    const handleDelete = async (id) => {
        const res = await removeUser(id);
        handleReload();
        console.log(res);
    };
    const handleReload = () => {
        setReload((prev) => !prev);
    };

    const PaginateUsers = sortedUsers?.slice(page * ITEM_PER_PAGE, (page + 1) * ITEM_PER_PAGE);
    return PaginateUsers.map((user) => (
        <Mui.TableRow key={user._id}>
            {!tableScreenSize && (
                <Mui.TableCell align="center">
                    <Mui.Avatar alt="user avatar" src={user.image.src} />
                </Mui.TableCell>
            )}
            <Mui.TableCell align="center">{user.nameA.first}</Mui.TableCell>
            <Mui.TableCell align="center">{user.nameA.last}</Mui.TableCell>
            <Mui.TableCell align="center">{user.email}</Mui.TableCell>
            <Mui.TableCell align="center">{user.phone}</Mui.TableCell>
            {!tableScreenSize && <Mui.TableCell align="center">{user.address.country}</Mui.TableCell>}
            <Mui.TableCell align="center">{user.invites.length}</Mui.TableCell>
            <Mui.TableCell align="center">{user.isMarrying ? "marry" : user.isCaller ? "caller" : "admin"}</Mui.TableCell>
            <Mui.TableCell align="center" width={"80px"}>
                <Mui.Button
                    onClick={() => {
                        handleDelete(user._id);
                    }}
                    color="mossGreen2"
                    style={{ minWidth: "40px" }}>
                    <RemoveIcon />
                </Mui.Button>
            </Mui.TableCell>
        </Mui.TableRow>
    ));
};

export default UserPaginate;
