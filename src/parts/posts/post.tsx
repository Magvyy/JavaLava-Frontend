import { use, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

// POSTS
import type { CommentResponse, PostRequest, PostResponse, UserI } from "@/types/ApiResponses";
import { formatDateStringToDDMonthYear } from "./functions";
import user from "../../assets/user.svg";
interface PostProps {
  data: PostResponse
}
export function Post(props: PostProps) {
  const { content, published, user_name, like_count, comment_count, id } = props.data;
  const [modal, setModal] = useState<boolean>(false);
  const user: UserI = {
    id: id,
    user_name: user_name,
    content: content
  };

  if (modal) {
    return (
      <PostModal
        data={props.data}
        callback={() => {
          setModal(false);
        }}
      />
    )
  }

  return (
    <Card className="mx-auto w-full max-w-sm post" onClick={() => setModal(true)}>
      <CardContent >
        <User
          user={user}
        />
      </CardContent>
      <CardFooter>
      </CardFooter>
    </Card>
  )
}


import { createPost } from "./functions";
import { getCurrentTime } from "../comments/functions";
interface AddPostProps {
  post_id: number,
  addPost: (post: PostResponse) => void
}
export function AddPost(props: AddPostProps) {
  const [content, setContent] = useState<string>("");
  const [published, setPublished] = useState<string>(getCurrentTime());
  const [visible, setVisible] = useState<boolean>(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    createPost(createPostRequest());
  }

  function createPostRequest() {
    let post: PostRequest = {
      id: null,
      content: content,
      published: published,
      visible: visible
    };
    return post;
  }

  return (
    <Card className="mx-auto w-full max-w-sm post">
      <form onSubmit={handleSubmit}>
          <CardContent className="post-card-content">
              <textarea
                  className="post-card-textarea"
                  onChange={(e => {
                      setContent(e.target.value);
                  })}
                  value={content}
              />
          </CardContent>
          <button type="submit" style={{display: "none"}}/>
      </form>
      <CardFooter className="post-card-footer">
          <Field id="visible-checkbox" orientation="horizontal">
              <FieldLabel htmlFor="terms-checkbox-basic">
                  Make post visible
              </FieldLabel>
              <Checkbox
                  id="terms-checkbox-basic"
                  name="terms-checkbox-basic"
                  checked={visible}
                  onCheckedChange={(value: boolean) => {
                      setVisible(value);
                  }}
              />
          </Field>
          {/* <Button onClick={createPost(createPostRequest())} className="post-card-button">
              Create
          </Button> */}
      </CardFooter>
    </Card>
  )
}

// POST MODALS
import { usePostComments } from "./functions";
import { Comment, AddComment } from '@/parts/comments/comment';
import { User } from "../users/user";
import { Field, FieldLabel } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@radix-ui/react-checkbox";
interface PostModalProps {
  data: PostResponse
  callback: () => void
}
function PostModal(props: PostModalProps) {
  const { content, published, user_name, like_count, comment_count, id } = props.data;
  const [update, setUpdate] = useState<boolean>(true);
  const { comments, setComments, state } = usePostComments(id, update);
  const user: UserI = {
    id: id,
    user_name: user_name,
    content: content
  };

  return (
    <div id="post-modal" onClick={() => props.callback()}>
      <Card className="mx-auto w-1/2 post" onClick={(e) => {e.stopPropagation();}}>
        <CardContent id="post-modal-header-section">
          <User
            user={user}
          />
        </CardContent>
        <CardFooter id="post-modal-comment-section">
          {comments.map(comment => (
            <Comment
              key={comment.id}
              comment={comment}
            />
          ))}
          <AddComment
            post_id={id}
            addComment={(comment: CommentResponse) => {
              setComments([...comments, comment]);
            }}
          />
        </CardFooter>
      </Card>
    </div>
  )
}