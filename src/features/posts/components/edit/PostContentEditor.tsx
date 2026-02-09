import { CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";


interface PostContentEditorProps {
    submitCallback: () => void,
    onContentChange: (value: string) => void,
    content: string,
    className?: string
}
export function PostContentEditor({ submitCallback, onContentChange, content, className }: PostContentEditorProps) {
    
    return (
        <CardContent className={className ? className : "w-full p-[10px]"}>
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    submitCallback();
                }}
                >
                <Textarea
                    className="resize-none p-[10px]"
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