import { CardHeader, CardTitle } from "@/components/ui/card";
import HeaderActions from "@/features/header-actions/components/HeaderActions";


import { ProfilePic, User } from "@/features/users";
import type { UserResponse } from "@/types/ApiResponses";
import { deletePostAPI } from "../services/deletePostAPI";


interface PostHeaderProps {
  post_id: number
  onDelete: (id: number) => void
  user: UserResponse
  onError?: ((message: string) => void) | null
  className?: string
}
export function PostHeader({ post_id, onDelete, user, onError, className }: PostHeaderProps) {

  const editPostRedirect = () => {
    window.location.href = "/post/edit/" + post_id;
  }

  const deletePost = async () => {
      await deletePostAPI(post_id, onDelete, null);
  }

  return (
    <CardHeader className={className ? className : "w-full flex justify-between p-[10px] pl-[30px]"}>
      <CardTitle>
        <User
          onClick={() => window.location.href = "/user/" + user.id}
          profilePicChild={
              <ProfilePic/>
          }
          user={user}
        />
      </CardTitle>
      <HeaderActions
        userId={user.id}
        editPostRedirect={editPostRedirect}
        deletePost={deletePost}
      />
    </CardHeader>
  )
}