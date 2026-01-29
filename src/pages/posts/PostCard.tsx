import { useEffect, useState } from 'react'
import './PostCard.css'
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldLabel
} from "@/components/ui/field"

import * as post from "./PostData";
import { useParams } from 'react-router-dom';

import edit from "../../assets/edit.svg";
import remove from "../../assets/remove.svg";
import exit from "../../assets/exit.svg";
import { AddPost } from '@/parts/posts/post'
import type { PostResponse } from '@/types/ApiResponses'

type onErrorFunc = (message: string) => void;
interface PostCardProps {
    postData: post.PostData,
    onError: onErrorFunc
}

interface PostCardCreateProps {
    onError: onErrorFunc
}

export default function PostCard() {
    const { mode, id } = useParams();

    const onPostCardError = (message: string) => {
        setState({loading: false, error: message});
    }

    if (mode == "create") {
        return <PostCardCreate onError={onPostCardError} />
    }

    const { postData, postState } = post.usePostData(id as unknown as number);
    const [data, setData] = useState<post.PostData>(postData);
    const [state, setState] = useState<post.PostState>(postState);

    useEffect(() => {

    }, [data, state]);

    useEffect(() => {
        setData(postData);
        setState(postState);
    }, [postData, postState]);

    if (state.error) {
        return (
            <p>{state.error}</p>
        )
    }

    if (state.loading) {
        return (
            <p> Loading... </p>
        )
    }

    if (mode == "edit") {
        return <PostCardEdit postData={data} onError={onPostCardError} />
    }

    if (mode == "view") {
        return <PostCardView postData={data} onError={onPostCardError} />
    }
}

function PostCardCreate({ onError } : PostCardCreateProps) {
    const [content, setContent] = useState<string>("");
    const [visible, setVisible] = useState<boolean>(false);
    const [published, setPublished] = useState<string>(new Date().toISOString().split("T")[0]);
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        editPost();
    }
    
    const editPost = async () => {
        try {
            let token = localStorage.getItem("jwt");
            const response = await
                fetch("http://localhost:8080/post", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        "id": 0,
                        "content": content,
                        "published": published,
                        "visible": visible
                    })
                });
            if (response.ok) {
                let postDTOResponse = await response.json();
                let postId = postDTOResponse.id;
                window.location.href = "/post/view/" + postId;
            } else {
                onError(response.status.toString());
            }
        } catch (err: any) {
            onError(err.message);
        }
    }

    return (
        <AddPost
            addPost={(post: PostResponse) => {}}
        />
    )
}

function PostCardEdit({ postData, onError } : PostCardProps) {
    const [content, setContent] = useState<string>(postData.content);
    const [visible, setVisible] = useState<boolean>(postData.visible);
    const published: string = postData.published;
    const userName: string = postData.userName;
    const id: number | null = postData.id;
    

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        editPost();
    }
    
    const editPost = async () => {
        if (id == null) {
            onError("Post ID missing");
        }
        try {
            let token = localStorage.getItem("jwt");
            const response = await
                fetch("http://localhost:8080/post/" + id, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        "id": id,
                        "content": content,
                        "published": published,
                        "visible": visible
                    })
                });
            if (response.ok) {
                window.location.href = "/post/view/" + id;
            } else {
                onError(response.status.toString());
            }
        } catch (err: any) {
            onError(err.message);
        }
    }

    return (
        <Card className="post-card">
            <form onSubmit={handleSubmit} className="post-card-form">
                <CardContent className="post-card-content">
                    <Textarea
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
                <Button onClick={editPost} className="post-card-button">
                    Save
                </Button>
                <p id="published">{userName} <br/> {published}</p>
            </CardFooter>
        </Card>
    )
}

function PostCardView({ postData, onError } : PostCardProps) {
    const { id, userId, content, published, userName } = postData;
    
    const deletePost = async (id: number | null) => {
        if (id == null) {
            onError("Post ID missing");
        }
        try {
            let token = localStorage.getItem("jwt");
            const response = await
                fetch("http://localhost:8080/post/" + id, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });
            if (response.ok) {
                window.location.href = "/";
            } else {
                onError(response.status.toString());
            }
        } catch (err: any) {
            onError(err.message);
        }
    }

    return (
        <Card className="post-card">
            <CardContent className="post-card-content">
                <div className="post-card-svgs">
                    {(userId == localStorage.getItem("user_id")) && <img src={edit} onClick={(e) => {
                        window.location.href = "/post/edit/" + id;
                    }}/>}
                    {(userId == localStorage.getItem("user_id")) && <img src={remove} onClick={(e) => {
                        deletePost(id);
                    }}/>}
                    <img src={exit} onClick={(e) => {
                        window.location.href = "/";
                    }}/>
                </div>
                <p>{content}</p>
            </CardContent>
            <CardFooter className="post-card-footer">
                <p id="published">{userName} <br/> {published}</p>
            </CardFooter>
        </Card>
    )
}