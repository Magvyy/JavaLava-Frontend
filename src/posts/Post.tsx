import { useEffect, useState } from 'react'
// import './Post.css'

type PostMode = "view" | "create" | "edit"

export interface PostModeProp {
    mode: PostMode,
}

export interface PostDataProp {
    data: post.PostData
}

import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"

import { Textarea } from "@/components/ui/textarea"

import * as post from "./PostData";


export default function Post({ mode } : PostModeProp) {
    const { data, state } = post.usePostData(1);

    useEffect(() => {
        
    }, [data]);

    if (mode == "create") {

    }

    if (state.loading) {
        return (
            <p> Loading... </p>
        )
    }

    if (mode == "edit") {
        return (
            <Card>
                <CardContent>
                    <p>{data["content" as keyof typeof data]}</p>
                </CardContent>
                <CardFooter>
                    <p>{data["userName" as keyof typeof data]} - {data["published" as keyof typeof data]}</p>
                </CardFooter>
            </Card>
        )
    }

    if (mode == "view") {
        return <PostView data={data} />
    }
}

function PostView({ data } : PostDataProp) {
    const { content, published, visible, userName } = data;

    return (
        <Card>
            <CardContent>
                <p>{content}</p>
            </CardContent>
            <CardFooter>
                <p>{userName} - {published}</p>
            </CardFooter>
        </Card>
    )
}