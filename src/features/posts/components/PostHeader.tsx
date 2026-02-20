import { CardHeader, CardTitle } from "@/components/ui/card";
import HeaderActions from "@/features/header-actions/components/HeaderActions";


import { ProfilePic, User } from "@/features/users";
import type { UserResponse } from "@/shared/types/UserApi";
import { deletePostAPI } from "../services/deletePostAPI";


interface PostHeaderProps {
  postId: number
  onDelete: (id: number) => void
  user: UserResponse
  onError?: ((message: string) => void) | null
  className?: string
}
export function PostHeader({ postId, onDelete, user, onError, className }: PostHeaderProps) {

  const editPostRedirect = () => {
    window.location.href = "/posts/edit/" + postId;
  }

  const deletePost = async () => {
      let id = await deletePostAPI(postId);
      if (id) onDelete(id);
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
        postId={postId}
        editPostRedirect={editPostRedirect}
        deletePost={deletePost}
      />
    </CardHeader>
  )
}