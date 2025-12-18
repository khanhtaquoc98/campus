import { useController } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export function FormInputNumber({
  control,
  name,
  label,
  error,
  disabled,
  min,
  max,
  step = 1,
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

  const handleChange = (e) => {
    const value = e.target.value
    if (value === "" || value === "-") {
      field.onChange(value)
      return
    }
    const numValue = parseFloat(value)
    if (!isNaN(numValue)) {
      if (min !== undefined && numValue < min) {
        field.onChange(min)
      } else if (max !== undefined && numValue > max) {
        field.onChange(max)
      } else {
        field.onChange(numValue)
      }
    }
  }

  return (
    <div className="space-y-2">
      {label && (
        <Label htmlFor={name} className={cn(disabled && "opacity-50")}>
          {label}
        </Label>
      )}
      <Input
        id={name}
        type="number"
        {...field}
        value={field.value ?? ""}
        onChange={handleChange}
        onBlur={field.onBlur}
        disabled={disabled}
        min={min}
        max={max}
        step={step}
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

