import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  FormInput,
  FormInputNumber,
  FormSelect,
  FormAutoComplete,
  FormDate,
  FormDateRange,
  FormCheckbox,
  FormRadio,
  FormFileInput,
} from "./index"

export function FormExample() {
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      name: "",
      age: 0,
      country: "",
      city: "",
      birthDate: null,
      dateRange: { from: undefined, to: undefined },
      agree: false,
      gender: "",
      avatar: null,
    },
  })

  const onSubmit = (data) => {
    console.log("Form Data:", data)
    alert("Check console for form data!")
  }

  const countries = [
    { value: "vn", label: "Vietnam" },
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
    { value: "jp", label: "Japan" },
  ]

  const cities = [
    { value: "hanoi", label: "Hanoi" },
    { value: "hcm", label: "Ho Chi Minh City" },
    { value: "danang", label: "Da Nang" },
    { value: "hue", label: "Hue" },
  ]

  const genders = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ]

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Form Components Example</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* FormInput */}
        <FormInput
          control={control}
          name="name"
          label="Name"
          placeholder="Enter your name"
          error={errors.name?.message}
          rules={{ required: "Name is required" }}
        />

        {/* FormInputNumber */}
        <FormInputNumber
          control={control}
          name="age"
          label="Age"
          placeholder="Enter your age"
          min={0}
          max={120}
          error={errors.age?.message}
          rules={{ 
            required: "Age is required",
            min: { value: 0, message: "Age must be at least 0" },
            max: { value: 120, message: "Age must be at most 120" }
          }}
        />

        {/* FormSelect */}
        <FormSelect
          control={control}
          name="country"
          label="Country"
          placeholder="Select a country"
          options={countries}
          error={errors.country?.message}
          rules={{ required: "Country is required" }}
        />

        {/* FormAutoComplete */}
        <FormAutoComplete
          control={control}
          name="city"
          label="City"
          placeholder="Search for a city"
          options={cities}
          error={errors.city?.message}
          rules={{ required: "City is required" }}
        />

        {/* FormDate */}
        <FormDate
          control={control}
          name="birthDate"
          label="Birth Date"
          placeholder="Pick a birth date"
          error={errors.birthDate?.message}
          rules={{ required: "Birth date is required" }}
        />

        {/* FormDateRange */}
        <FormDateRange
          control={control}
          name="dateRange"
          label="Date Range"
          placeholder="Pick a date range"
          error={errors.dateRange?.message}
        />

        {/* FormCheckbox */}
        <FormCheckbox
          control={control}
          name="agree"
          label="I agree to the terms and conditions"
          error={errors.agree?.message}
          rules={{ required: "You must agree to continue" }}
        />

        {/* FormRadio */}
        <FormRadio
          control={control}
          name="gender"
          label="Gender"
          options={genders}
          error={errors.gender?.message}
          rules={{ required: "Gender is required" }}
        />

        {/* FormFileInput */}
        <FormFileInput
          control={control}
          name="avatar"
          label="Avatar"
          accept="image/*"
          error={errors.avatar?.message}
        />

        <div className="flex gap-4">
          <Button type="submit">Submit</Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => reset()}
          >
            Reset
          </Button>
        </div>
      </form>
    </div>
  )
}

