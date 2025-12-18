import { useController } from "react-hook-form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export function FormSelect({
  control,
  name,
  label,
  error,
  disabled,
  options = [],
  placeholder = "Select an option",
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
      <Select
        value={field.value ?? ""}
        onValueChange={field.onChange}
        disabled={disabled}
        {...props}
      >
        <SelectTrigger
          id={name}
          className={cn(
            errorMessage && "border-destructive focus:ring-destructive",
            className
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => {
            const value = typeof option === "string" ? option : option.value
            const label = typeof option === "string" ? option : option.label
            return (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>
      {errorMessage && (
        <p className="text-sm text-destructive">{errorMessage}</p>
      )}
    </div>
  )
}

