const UsersCalc = {
    UsersCount: (users) => {
        const callers = users.filter((user) => user.isCaller).length;
        const marry = users.filter((user) => user.isMarrying).length;
        return { callers, marry };
    },
    InvitesCount: (users) => {
        const marry = users.filter((user) => user.isMarrying);
        const acceptedCount = marry.reduce((acc, item) => acc + item.invites.filter((invite) => invite.isAccepted).length, 0);
        const declinedCount = marry.reduce((acc, item) => acc + item.invites.filter((invite) => invite.isDeclined).length, 0);
        const pendingCount = marry.reduce((acc, item) => acc + item.invites.filter((invite) => invite.isPending).length, 0);
        const total = acceptedCount + declinedCount + pendingCount;
        return { acceptedCount, declinedCount, pendingCount, total };
    },
};
export default UsersCalc;
