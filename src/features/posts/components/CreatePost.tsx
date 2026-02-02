import type { PostRequest, PostResponse } from "@/types/ApiResponses";
import { useState } from "react";
import { createPost } from "../services/createPost";
import { getCurrentTime } from "../services/getCurrentTime";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldLabel } from "@/components/ui/field";
import { Checkbox } from "@radix-ui/react-checkbox";
import { Button } from "@/components/ui/button";


interface PostAdderProps {
  onCreate: (post: PostResponse) => void,
  onError: ((message: string) => void) | null
}
export function PostAdder(props: PostAdderProps) {
  let { onCreate, onError } = props;
  const [content, setContent] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);

  function createPostRequest() {
    let post: PostRequest = {
      id: null,
      content: content,
      published: getCurrentTime(),
      visible: visible
    };
    return post;
  }

  return (
    <Card className="mx-auto w-full max-w-sm post">
      <CardContent className="w-full">
        <form onSubmit={(event) => {
          event.preventDefault();
          createPost(createPostRequest(), onCreate, onError);
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
                  createPost(createPostRequest(), onCreate, onError);
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
          <Button onClick={() => createPost(createPostRequest(), onCreate, onError)} className="post-card-button">
              Create
          </Button>
      </CardFooter>
    </Card>
  )
}