import { useState, useRef, useEffect } from "react"
import { useController } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function FormAutoComplete({
  control,
  name,
  label,
  error,
  disabled,
  options = [],
  placeholder = "Search...",
  getOptionLabel = (option) => (typeof option === "string" ? option : option.label),
  getOptionValue = (option) => (typeof option === "string" ? option : option.value),
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

  const [open, setOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const inputRef = useRef(null)

  const errorMessage = error || fieldError?.message

  const selectedOption = options.find(
    (option) => getOptionValue(option) === field.value
  )

  const filteredOptions = options.filter((option) => {
    const label = getOptionLabel(option).toLowerCase()
    return label.includes(searchValue.toLowerCase())
  })

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus()
    }
  }, [open])

  return (
    <div className="space-y-2 w-full">
      {label && (
        <Label htmlFor={name} className={cn(disabled && "opacity-50")}>
          {label}
        </Label>
      )}
      <div className="w-full">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              disabled={disabled}
              className={cn(
                "w-full justify-between",
                !selectedOption && "text-muted-foreground",
                errorMessage && "border-destructive",
                className
              )}
              {...props}
            >
              {selectedOption
                ? getOptionLabel(selectedOption)
                : placeholder}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent 
            className="w-[var(--radix-popover-trigger-width)] p-0" 
            align="start"
            sideOffset={4}
          >
          <div className="p-2">
            <Input
              ref={inputRef}
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="mb-2 w-full"
            />
            <div className="max-h-[200px] overflow-auto">
              {filteredOptions.length === 0 ? (
                <div className="py-6 text-center text-sm text-muted-foreground">
                  No options found.
                </div>
              ) : (
                filteredOptions.map((option) => {
                  const value = getOptionValue(option)
                  const optionLabel = getOptionLabel(option)
                  const isSelected = field.value === value
                  return (
                    <div
                      key={value}
                      className={cn(
                        "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground",
                        isSelected && "bg-accent"
                      )}
                      onClick={() => {
                        field.onChange(value)
                        setOpen(false)
                        setSearchValue("")
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          isSelected ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {optionLabel}
                    </div>
                  )
                })
              )}
            </div>
          </div>
          </PopoverContent>
        </Popover>
      </div>
      {errorMessage && (
        <p className="text-sm text-destructive">{errorMessage}</p>
      )}
    </div>
  )
}

