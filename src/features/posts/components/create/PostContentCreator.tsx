import { CardContent } from "@/components/ui/card";

import "./css/post-content-creator.css";
import { Textarea } from "@/components/ui/textarea";

interface PostContentCreatorProps {
    submitCallback: () => void,
    content: string
    setContent: (value: string) => void,
}
export function PostContentCreator({ submitCallback, content, setContent }: PostContentCreatorProps) {
    
    return (
        <CardContent className="post-content-creator">
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    submitCallback();
                }}
                className="post-adder-form">
                <Textarea
                    className="post-adder-textarea"
                    onChange={(e => {
                        setContent(e.target.value);
                    })}
                    value={content}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        submitCallback();
                        setContent("");
                        }
                    }}
                />
            </form>
        </CardContent>
    )
}