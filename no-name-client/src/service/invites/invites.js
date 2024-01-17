const splitInvitesByStatus = (user) => {
    const pendingInvites = [];
    const acceptedInvites = [];
    const declinedInvites = [];
    if (!user) return { pendingInvites, acceptedInvites, declinedInvites };
    user?.invites.forEach((invite) => {
        if (invite.isPending) {
            pendingInvites.push(invite);
        } else if (invite.isAccepted) {
            acceptedInvites.push(invite);
        } else if (invite.isDeclined) {
            declinedInvites.push(invite);
        }
    });

    return {
        pendingInvites,
        acceptedInvites,
        declinedInvites,
    };
};
export { splitInvitesByStatus };
