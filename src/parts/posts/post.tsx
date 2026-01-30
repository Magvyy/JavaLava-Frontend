import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldLabel
} from "@/components/ui/field"

import "./post.css"

// POSTS
import type { CommentResponse, PostRequest, PostResponse, State, UserI } from "@/types/ApiResponses";
interface PostProps {
  post: PostResponse | null,
  onCreate: (post: PostResponse) => void,
  onEdit: (post: PostResponse) => void,
  onDelete: (post: PostResponse) => void,
  onError: ((message: string) => void) | null
}
export function Post(props: PostProps) {
  const onError = () => {

  }

  if (props.post != null) {
    return (
      <ReadPost 
        post={props.post}
        onEdit={props.onEdit}
        onDelete={props.onDelete}
        onError={onError}
      />
    )
  }

  return (
    <WritePost
        post={props.post}
        onCreate={props.onCreate}
        onError={props.onError}
    />
  )
}


import { createPost, editPost } from "./functions";
import { getCurrentTime } from "../comments/functions";
interface WritePostProps {
  post: PostResponse | null,
  onCreate: (post: PostResponse) => void,
  onError: ((message: string) => void) | null
}
export function WritePost(props: WritePostProps) {
  let data = props.post;
  const [content, setContent] = useState<string>((data != null) ? data.content : "");
  const [visible, setVisible] = useState<boolean>((data != null) ? data.visible : false);

  function postData() {
    let post = createPostRequest();
    if (data == null) {
      createPost(post, props.onCreate, props.onError);
    } else {
      editPost(post, props.onCreate, props.onError);
    }
  }

  function createPostRequest() {
    let post: PostRequest = {
      id: (data != null) ? data.id : null,
      content: content,
      published: (data != null) ? data.published : getCurrentTime(),
      visible: visible
    };
    return post;
  }

  return (
    <Card className="mx-auto w-full max-w-sm post">
      <CardContent className="w-full">
        <form onSubmit={(event) => {
          event.preventDefault();
          postData();
        }} className="post-adder-form">
            <Textarea
              className="post-adder-textarea"
              onChange={(e => {
                  setContent(e.target.value);
              })}
              value={content}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  postData();
                  setContent("");
                }
              }}
            />
        </form>
      </CardContent>
      <CardFooter className="w-full post-adder-footer">
          <Field id="visible-checkbox" orientation="horizontal">
              <Checkbox
                  id="terms-checkbox-basic"
                  name="terms-checkbox-basic"
                  checked={visible}
                  onCheckedChange={(value: boolean) => {
                      setVisible(value);
                  }}
              />
              <FieldLabel htmlFor="terms-checkbox-basic">
                  Make post visible
              </FieldLabel>
          </Field>
          <Button onClick={() => postData()} className="post-card-button">
              Create
          </Button>
      </CardFooter>
    </Card>
  )
}


interface ReadPostProps {
  post: PostResponse,
  onDelete: (post: PostResponse) => void,
  onEdit: (post: PostResponse) => void,
  onError: ((message: string) => void) | null
}
export function ReadPost(props: ReadPostProps) {
  const { content, published, user_name, user_id, like_count, comment_count, id } = props.post;
  const [modal, setModal] = useState<boolean>(false);
  const user: UserI = {
    id: user_id,
    user_name: user_name,
    content: content
  };

  const svgCallback = () => {
    props.onDelete(props.post);
  }

  if (modal) {
    return (
      <PostModal
        post={props.post}
        callback={() => {
          setModal(false);
        }}
        svgCallback={svgCallback}
      />
    )
  }

  return (
    <Card className="mx-auto w-full max-w-sm post" onClick={() => setModal(true)}>
      <CardContent className="post-content">
        <User
          user={user}
        />
      </CardContent>
      <CardFooter className="post-footer">
        <PostFooter/>
      </CardFooter>
    </Card>
  )
}


import { deletePost } from "./functions";
import edit from "../../assets/edit.svg";
import remove from "../../assets/remove.svg";
import exit from "../../assets/exit.svg";
interface PostSvgProps {
  callback: () => void,
  userId: number,
  postId: number,
  onError: ((message: string) => void) | null,
  modal: boolean
}
function PostSvgs(props: PostSvgProps) {
  let userId = props.userId;
  let postId = props.postId;
  let localId = localStorage.getItem("user_id");

  return (
    <div className="post-svgs">
        {(localId != null && userId == Number.parseInt(localId)) && <img src={edit} onClick={(e) => {
          e.stopPropagation();
          window.location.href = "/post/edit/" + postId;
        }}/>}
        {(localId != null && userId == Number.parseInt(localId)) && <img src={remove} onClick={(e) => {
          e.stopPropagation();
          deletePost(postId, props.callback, props.onError);
        }}/>}
        {(props.modal == true) && <img src={exit} onClick={(e) => {
          e.stopPropagation();
          window.location.href = "/";
        }}/>}
    </div>
  )
}

// POST MODALS
import { usePostComments } from "./functions";
import { Comment, AddComment } from '@/parts/comments/comment';
import { User } from "../users/user";
interface PostModalProps {
  post: PostResponse
  callback: () => void,
  svgCallback: () => void,
}
function PostModal(props: PostModalProps) {
  const { content, published, user_name, user_id, like_count, comment_count, id } = props.post;
  const [update, setUpdate] = useState<boolean>(true);
  const { comments, setComments, state } = usePostComments(id, update);
  const user: UserI = {
    id: user_id,
    user_name: user_name,
    content: content
  };

  return (
    <div id="post-modal" onClick={() => props.callback()}>
      <Card className="mx-auto w-1/2 post" onClick={(e) => {e.stopPropagation();}}>
        <CardContent className="post-content">
          <PostSvgs
            callback={props.svgCallback}
            userId={user_id}
            postId={id}
            onError={null}
            modal={false}
          />
          <User
            user={user}
          />
        </CardContent>
        <CardFooter className="post-modal-comment-section">
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

import comment from "../../assets/comment.svg";
import like from "../../assets/like.svg";
interface PostFooterProps {
  
}
function PostFooter(props: PostFooterProps) {
  const [liked, setLiked] = useState<boolean>(false);

  return (
    <div className="post-footer-svgs">
      <img src={like} onClick={(e) => {
        
      }}/>
      <img src={comment} onClick={(e) => {

      }}/>
    </div>
  )
}