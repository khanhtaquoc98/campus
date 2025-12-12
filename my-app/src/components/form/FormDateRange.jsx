import { useController } from "react-hook-form"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export function FormDateRange({
  control,
  name,
  label,
  error,
  disabled,
  placeholder = "Pick a date range",
  dateFormat = "PPP",
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

  const value = field.value || { from: undefined, to: undefined }

  return (
    <div className="space-y-2">
      {label && (
        <Label htmlFor={name} className={cn(disabled && "opacity-50")}>
          {label}
        </Label>
      )}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={name}
            variant="outline"
            disabled={disabled}
            className={cn(
              "w-full justify-start text-left font-normal",
              !value.from && "text-muted-foreground",
              errorMessage && "border-destructive",
              className
            )}
            {...props}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value.from ? (
              value.to ? (
                <>
                  {format(value.from, dateFormat)} -{" "}
                  {format(value.to, dateFormat)}
                </>
              ) : (
                format(value.from, dateFormat)
              )
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            selected={value}
            onSelect={(range) => field.onChange(range)}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {errorMessage && (
        <p className="text-sm text-destructive">{errorMessage}</p>
      )}
    </div>
  )
}

