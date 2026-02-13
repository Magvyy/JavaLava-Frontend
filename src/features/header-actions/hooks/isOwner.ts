import { useAuthenticateMe } from "@/shared/hooks/useAuthenticateMe";


export function isOwner(userId: number) {
    const { user, state } = useAuthenticateMe();
    if (!user) {
        return false;
    }
    return userId === user.id;
}