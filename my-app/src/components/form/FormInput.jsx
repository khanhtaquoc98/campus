import { useController } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export function FormInput({
  control,
  name,
  label,
  error,
  disabled,
  rules,
  className,
  ...props
}) {
  const {
    field,
    fieldState: { error: fieldError },
  } = useController({
    name,
    control,
    rules,
  })

  const errorMessage = error || fieldError?.message

  return (
    <div className="space-y-2">
      {label && (
        <Label htmlFor={name} className={cn(disabled && "opacity-50")}>
          {label}
        </Label>
      )}
      <Input
        id={name}
        {...field}
        disabled={disabled}
        className={cn(
          errorMessage && "border-destructive focus-visible:ring-destructive",
          className
        )}
        {...props}
      />
      {errorMessage && (
        <p className="text-sm text-destructive">{errorMessage}</p>
      )}
    </div>
  )
}

