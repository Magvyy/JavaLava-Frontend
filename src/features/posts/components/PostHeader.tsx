
import { CardHeader, CardTitle } from "@/components/ui/card";
import "./css/post-header.css"

import HeaderActions from "@/features/header-actions/components/HeaderActions";
import { User } from "@/features/users";
import type { UserResponse } from "@/types/ApiResponses";
interface PostHeaderProps {
  editPost: () => void,
  deletePost: () => void,
  user: UserResponse,
  onError?: ((message: string) => void) | null
}
export function PostHeader({ editPost, deletePost, user, onError }: PostHeaderProps) {

  const editCallback = () => {
    editPost();
  }

  const deleteCallback = () => {
    deletePost();
  }

  return (
    <CardHeader className="post-header-actions">
      <CardTitle>
        <User
            user={user}
        />
      </CardTitle>
      <HeaderActions
        userId={user.id}
        deleteCallback={deleteCallback}
        editCallback={editCallback}
      />
    </CardHeader>
  )
}