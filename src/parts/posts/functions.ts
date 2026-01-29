import type { CommentResponse, PostRequest, PostResponse, State } from "@/types/ApiResponses";
import { useEffect, useState } from "react";

export function formatDateStringToDDMonthYear(dateString: string): string {
  const dateObj = new Date();
  const parts = dateString.split(' ');

  const dateParts = parts[0].split('-');
  const day = parseInt(dateParts[0], 10);
  const month = parseInt(dateParts[1], 10) - 1; 
  const year = parseInt(dateParts[2], 10);
  dateObj.setUTCFullYear(year, month, day);

  const timeParts = parts[1].split(":");
  const hour = parseInt(timeParts[0], 10) - 1;
  const minute = parseInt(timeParts[1], 10);
  dateObj.setUTCHours(hour, minute, 0, 0);

  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: "numeric",
    minute: "numeric"
  };

  const formattedDate = dateObj.toLocaleDateString('en-GB', options);

  return formattedDate;
}


// hook that fetches comments for a post
export const usePostComments = (postId: number, update: boolean) => {
    const [comments, setComments] = useState<CommentResponse[]>([]);
    const [state, setState] = useState<State>({
        loading: true,
        error: null
    });
    const [page, setPage] = useState<number>(0);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                let token = localStorage.getItem("jwt");
                const response = await
                    fetch("http://localhost:8080/post/" + postId  + "/comments?page=" + page, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                            "Authorization": `Bearer ${token}`
                        }
                    });
                if (response.ok) {
                    const postsJSON = await response.json();
                    setComments([...comments, ...postsJSON]);
                    setState({
                        loading: false,
                        error: null
                    });
                    setPage(page + 1);
                } else {
                    setState({ loading: false, error: response.status.toString() });
                }
            } catch (err: any) {
                setState({ loading: false, error: err.message });
            }
        }
        fetchPosts();
    }, [update]);
    return { comments, setComments, state };
}

export async function createPost(post: PostRequest, addPost: (post: PostResponse) => void) {
    let token = localStorage.getItem("jwt");
    let response = await fetch("http://localhost:8080/post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(post)
        });
    if (response.ok) {
        let postDTOResponse = await response.json();
        addPost(postDTOResponse);
    } else {
        // onError(response.status.toString());
    }
}