import { CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";


interface PostContentEditorProps {
    submitCallback: () => void
    content: string
    setContent: (value: string) => void
    className?: string
}
export function PostContentEditor({ submitCallback, content, setContent, className }: PostContentEditorProps) {
    
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
                        setContent(e.target.value);
                    })}
                    value={content}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            submitCallback();
                        }
                    }}
                />
            </form>
            <p id="error-box" className="hidden"></p>
        </CardContent>
    )
}