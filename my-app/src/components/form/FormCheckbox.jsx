import { useController } from "react-hook-form"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export function FormCheckbox({
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
      <div className="flex items-center space-x-2">
        <Checkbox
          id={name}
          checked={field.value || false}
          onCheckedChange={field.onChange}
          disabled={disabled}
          className={cn(
            errorMessage && "border-destructive",
            className
          )}
          {...props}
        />
        {label && (
          <Label
            htmlFor={name}
            className={cn(
              "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
              disabled && "opacity-50"
            )}
          >
            {label}
          </Label>
        )}
      </div>
      {errorMessage && (
        <p className="text-sm text-destructive">{errorMessage}</p>
      )}
    </div>
  )
}

