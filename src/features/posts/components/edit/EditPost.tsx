import type { PostResponse } from "@/types/ApiResponses";
import "./css/edit-post.css"

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
  onError?: ((message: string) => void)
}
export function EditPost({ post, editPost, deletePost, onEdit, onError }: EditPostProps) {
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
    <Card className="mx-auto w-full max-w-sm post">
      <PostHeader
        editPost={editPost}
        deletePost={deletePost}
        user={post.user}
        onError={onError}
      />
      <PostContentEditor
        submitCallback={submitCallback}
        onContentChange={onContentChange}
        content={content}
      />
      <PostFooterEditor
        submitCallback={submitCallback}
        onVisibleChange={onVisibleChange}
        visible={visible}
      />
    </Card>
  )
}