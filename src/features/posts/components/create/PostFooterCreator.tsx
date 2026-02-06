import "./css/post-footer-creator.css"

import { CardFooter } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
interface PostFooterCreatorProps {
  submitCallback: () => void,
  visible: boolean,
  setVisible: (value: boolean) => void
}
export function PostFooterCreator({ submitCallback, setVisible, visible }: PostFooterCreatorProps) {
  return (
      <CardFooter className="post-footer-editor">
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
        <Button onClick={() => submitCallback()} className="post-card-button">
            Post
        </Button>
      </CardFooter>
  )
}