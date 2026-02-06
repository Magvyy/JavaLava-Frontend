import { useAuthenticateMe } from "@/shared/hooks/usePostComments";


export function isOwner(userId: number) {
  const { user } = useAuthenticateMe();
    if (user === null) {
        return false;
    }
    return userId === user.id;
}