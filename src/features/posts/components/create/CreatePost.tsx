import type { PostResponse } from "@/types/ApiResponses";

import { useState } from "react";
import { getCurrentTime } from "../../services/getCurrentTime";
import { Card } from "@/components/ui/card";
import { PostFooterCreator } from "./PostFooterCreator";
import { PostContentCreator } from "./PostContentCreator";
import { createPostAPI } from "../../services/createPostAPI";


interface CreatePostProps {
  onCreate: (post: PostResponse) => void,
  onError?: ((message: string) => void),
  className?: string,
  headerClassName?: string,
  contentClassName?: string,
  footerClassName?: string
}
export function CreatePost({ onCreate, onError, className, headerClassName, contentClassName, footerClassName }: CreatePostProps) {
  const [content, setContent] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);

  function createPostRequest() {
      return {
          id: null,
          content: content,
          published: getCurrentTime(),
          visible: visible
      };
  }
  
  const submitCallback = async () => {
      let postRequest = createPostRequest();
      await createPostAPI(postRequest, onCreate, null);
  }
  

  return (
    <Card className={className ? className : "mx-auto w-full max-w-sm p-0"}>
      {/* <PostHeader
        editPost={editPost}
        deletePost={deletePost}
        user={post.user}
        onError={onError}
        className={headerClassName}
      /> */}
      <PostContentCreator
        submitCallback={submitCallback}
        content={content}
        setContent={setContent}
        className={contentClassName}
      />
      <PostFooterCreator
        submitCallback={submitCallback}
        visible={visible}
        setVisible={setVisible}
        className={footerClassName}
      />
    </Card>
  )
}