import "./css/post-footer-editor.css"

import { CardFooter } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
interface PostFooterEditorProps {
  submitCallback: () => void,
  onVisibleChange: (value: boolean) => void,
  visible: boolean,
}
export function PostFooterEditor({ submitCallback, onVisibleChange, visible }: PostFooterEditorProps) {
  return (
      <CardFooter className="post-footer-editor">
        <Field id="visible-checkbox" orientation="horizontal">
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
        <Button onClick={() => submitCallback()} className="post-card-button">
            Edit
        </Button>
      </CardFooter>
  )
}