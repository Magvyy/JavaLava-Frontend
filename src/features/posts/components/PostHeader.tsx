import { CardHeader, CardTitle } from "@/components/ui/card";
import HeaderActions from "@/features/header-actions/components/HeaderActions";


import { User } from "@/features/users";
import type { UserResponse } from "@/types/ApiResponses";


interface PostHeaderProps {
  editPost: () => void,
  deletePost: () => void,
  user: UserResponse,
  onError?: ((message: string) => void) | null,
  className?: string
}
export function PostHeader({ editPost, deletePost, user, onError, className }: PostHeaderProps) {

  const editCallback = () => {
    editPost();
  }

  const deleteCallback = () => {
    deletePost();
  }

  return (
    <CardHeader className={className ? className : "w-full flex justify-between p-[10px] pl-[30px]"}>
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