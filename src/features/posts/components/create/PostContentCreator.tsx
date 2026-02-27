import { CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { FileInput } from "@/features/filedrop/components/FileInput";


interface PostContentCreatorProps {
    submitCallback: () => void
    content: string
    setContent: (value: string) => void
    file?: File
    setFile: (value: File | undefined) => void
    className?: string
}
export function PostContentCreator({ submitCallback, content, setContent, file, setFile, className }: PostContentCreatorProps) {

    return (
        <CardContent className={className ? className : "w-full p-[10px]"}>
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    submitCallback();
                }}
                className="flex flex-col gap-[10px]"
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
                <FileInput
                    className="w-full h-full flex text-center gap-[5px]"
                    setFile={setFile}
                />
            </form>
            <p id="error-box" className="hidden"></p>
        </CardContent>
    )
}