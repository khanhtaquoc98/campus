import { useController } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { Upload } from "lucide-react"

export function FormFileInput({
  control,
  name,
  label,
  error,
  disabled,
  accept,
  rules,
  className,
  ...props
}) {
  const {
    field: { value, onChange, ...field },
    fieldState: { error: fieldError },
  } = useController({
    name,
    control,
    rules,
  })

  const errorMessage = error || fieldError?.message
  const fileName = value?.name || (value && value.length > 0 ? value[0]?.name : "")

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      onChange(file)
    }
  }

  return (
    <div className="space-y-2">
      {label && (
        <Label htmlFor={name} className={cn(disabled && "opacity-50")}>
          {label}
        </Label>
      )}
      <div className="relative">
        <Input
          id={name}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          disabled={disabled}
          className={cn(
            "cursor-pointer",
            errorMessage && "border-destructive focus-visible:ring-destructive",
            className
          )}
          {...field}
          {...props}
        />
        {fileName && (
          <div className="mt-2 flex items-center space-x-2 text-sm text-muted-foreground">
            <Upload className="h-4 w-4" />
            <span>{fileName}</span>
          </div>
        )}
      </div>
      {errorMessage && (
        <p className="text-sm text-destructive">{errorMessage}</p>
      )}
    </div>
  )
}

