import { CardFooter } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";


interface PostFooterEditorProps {
  submitCallback: () => void,
  onVisibleChange: (value: boolean) => void,
  visible: boolean,
  className?: string
}
export function PostFooterEditor({ submitCallback, onVisibleChange, visible, className }: PostFooterEditorProps) {
  return (
      <CardFooter className={className ? className : "w-full p-[10px] border-1 rounded-br-[10px] rounded-bl-[10px]"}>
        <Field className="flex flex-col gap-[1px] w-4/10" orientation="horizontal">
            <Checkbox
                id="terms-checkbox-basic"
                name="terms-checkbox-basic"
                checked={visible}
                onCheckedChange={(value: boolean) => {
                  onVisibleChange(value);
                }}
            />
            <FieldLabel htmlFor="terms-checkbox-basic">
                Make post visible
            </FieldLabel>
        </Field>
        <Button onClick={() => submitCallback()} className="w-6/10">
            Edit
        </Button>
      </CardFooter>
  )
}