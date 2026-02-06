import { CardContent } from "@/components/ui/card";

import "./css/post-content-editor.css";
import { Textarea } from "@/components/ui/textarea";

interface PostContentEditorProps {
    submitCallback: () => void,
    onContentChange: (value: string) => void,
    content: string
}
export function PostContentEditor({ submitCallback, onContentChange, content }: PostContentEditorProps) {
    
    return (
        <CardContent className="post-content-editor">
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    submitCallback();
                }}
                className="post-adder-form">
                <Textarea
                    className="post-adder-textarea"
                    onChange={(e => {
                        onContentChange(e.target.value);
                    })}
                    value={content}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        submitCallback();
                        onContentChange("");
                        }
                    }}
                />
            </form>
        </CardContent>
    )
}