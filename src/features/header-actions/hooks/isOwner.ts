

export function isOwner(userId: number) {
    let oAuth = localStorage.getItem("user_id");
    if (oAuth === null) {
        return false;
    }
    let localId = Number.parseInt(oAuth);
    return userId === localId;
}