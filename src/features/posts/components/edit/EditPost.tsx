import type { PostResponse } from "@/types/ApiResponses";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { PostFooterEditor } from "./PostFooterEditor";
import { PostContentEditor } from "./PostContentEditor";
import { editPostAPI } from "../../services/editPostAPI";
import { PostHeader } from "../PostHeader";


interface EditPostProps {
  post: PostResponse,
  editPost: () => void,
  deletePost: () => void,
  onEdit: (post: PostResponse) => void,
  onError?: ((message: string) => void),
  className?: string,
  headerClassName?: string,
  contentClassName?: string,
  footerClassName?: string
}
export function EditPost({ post, editPost, deletePost, onEdit, onError, className, headerClassName, contentClassName, footerClassName }: EditPostProps) {
  const [content, setContent] = useState<string>(post.content)
  const [visible, setVisible] = useState<boolean>(post.visible);
      
  function createPostRequest() {
      return {
          id: post.id,
          content: content,
          published: post.published,
          visible: visible
      };
  }

  const onVisibleChange = (value: boolean) => {
    setVisible(value);
  }

  const onContentChange = (value: string) => {
    setContent(value);
  }

  const submitCallback = async () => {
    let postRequest = createPostRequest();
    // Probably catch here
    let postResponse = await editPostAPI(postRequest, onEdit, null);
    onEdit(postResponse);
  }

  return (
    <Card className={className ? className : "mx-auto w-full max-w-sm p-0"}>
      <PostHeader
        editPost={editPost}
        deletePost={deletePost}
        user={post.user}
        onError={onError}
        className={headerClassName}
      />
      <PostContentEditor
        submitCallback={submitCallback}
        onContentChange={onContentChange}
        content={content}
        className={contentClassName}
      />
      <PostFooterEditor
        submitCallback={submitCallback}
        onVisibleChange={onVisibleChange}
        visible={visible}
        className={footerClassName}
      />
    </Card>
  )
}