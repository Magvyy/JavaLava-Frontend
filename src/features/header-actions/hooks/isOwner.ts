import { useAuthenticateMe } from "@/shared/hooks/useAuthenticateMe";


export function isOwner(userId: number) {
  const { user } = useAuthenticateMe();
    if (!user) {
        return false;
    }
    return userId === user.id;
}