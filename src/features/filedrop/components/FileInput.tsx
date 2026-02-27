import { Field, FieldDescription } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

interface FileInputProps {
  setFile: (value: File | undefined) => void
  description?: string
  className?: string
}
export function FileInput({ setFile, description, className }: FileInputProps) {
  return (
    <Field className={className}>
      <FieldDescription>{description ? description : "Select a picture to upload."}</FieldDescription>
      <Input
        id="picture"
        type="file"
        onChange={(e) => {
          let files = e.target.files;
          if (!files) setFile(undefined);
          else setFile(files[0]);
        }}
      />
    </Field>
  )
}
