import { useController } from "react-hook-form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export function FormRadio({
  control,
  name,
  label,
  error,
  disabled,
  options = [],
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
        <Label className={cn(disabled && "opacity-50")}>{label}</Label>
      )}
      <RadioGroup
        value={field.value ?? ""}
        onValueChange={field.onChange}
        disabled={disabled}
        className={cn(className)}
        {...props}
      >
        {options.map((option) => {
          const value = typeof option === "string" ? option : option.value
          const optionLabel = typeof option === "string" ? option : option.label
          return (
            <div key={value} className="flex items-center space-x-2">
              <RadioGroupItem value={value} id={`${name}-${value}`} />
              <Label
                htmlFor={`${name}-${value}`}
                className="font-normal cursor-pointer"
              >
                {optionLabel}
              </Label>
            </div>
          )
        })}
      </RadioGroup>
      {errorMessage && (
        <p className="text-sm text-destructive">{errorMessage}</p>
      )}
    </div>
  )
}

