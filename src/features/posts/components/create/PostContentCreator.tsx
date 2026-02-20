import { CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";


interface PostContentCreatorProps {
    submitCallback: () => void,
    content: string
    setContent: (value: string) => void,
    className?: string
}
export function PostContentCreator({ submitCallback, content, setContent, className }: PostContentCreatorProps) {

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