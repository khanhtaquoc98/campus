# Form Components với React Hook Form và Shadcn UI

Bộ các component form được tích hợp sẵn với `react-hook-form` và `shadcn/ui`.

## Cài đặt Dependencies

Đảm bảo đã cài đặt các packages sau:

```bash
npm install react-hook-form
```

Các dependencies khác đã được thêm vào `package.json`.

## Các Components

### 1. FormInput

Input text cơ bản.

```jsx
import { useForm } from "react-hook-form"
import { FormInput } from "@/components/form"

function MyForm() {
  const { control } = useForm()
  
  return (
    <FormInput
      control={control}
      name="email"
      label="Email"
      placeholder="Enter your email"
      rules={{ required: "Email is required" }}
    />
  )
}
```

**Props:**
- `control`: Control object từ `useForm()`
- `name`: Tên field (required)
- `label`: Label hiển thị (optional)
- `error`: Error message tùy chỉnh (optional)
- `disabled`: Disable input (optional)
- `rules`: Validation rules (optional)
- `className`: Custom CSS classes (optional)
- Các props khác của Input component

### 2. FormInputNumber

Input cho số, tự động validate min/max.

```jsx
<FormInputNumber
  control={control}
  name="age"
  label="Age"
  min={0}
  max={120}
  step={1}
  rules={{ 
    required: "Age is required",
    min: { value: 0, message: "Age must be at least 0" }
  }}
/>
```

**Props:**
- Tất cả props của `FormInput`
- `min`: Giá trị tối thiểu (optional)
- `max`: Giá trị tối đa (optional)
- `step`: Bước nhảy (default: 1)

### 3. FormSelect

Dropdown select.

```jsx
const options = [
  { value: "vn", label: "Vietnam" },
  { value: "us", label: "United States" },
]

<FormSelect
  control={control}
  name="country"
  label="Country"
  options={options}
  placeholder="Select a country"
  rules={{ required: "Country is required" }}
/>
```

**Props:**
- `options`: Array of options (string[] hoặc {value, label}[])
- `placeholder`: Placeholder text (default: "Select an option")
- Các props khác tương tự `FormInput`

### 4. FormAutoComplete

Autocomplete với search.

```jsx
<FormAutoComplete
  control={control}
  name="city"
  label="City"
  options={cities}
  placeholder="Search for a city"
  rules={{ required: "City is required" }}
/>
```

**Props:**
- `options`: Array of options
- `getOptionLabel`: Function để lấy label (optional)
- `getOptionValue`: Function để lấy value (optional)
- Các props khác tương tự `FormSelect`

### 5. FormDate

Date picker cho một ngày.

```jsx
<FormDate
  control={control}
  name="birthDate"
  label="Birth Date"
  placeholder="Pick a date"
  dateFormat="PPP"
  rules={{ required: "Birth date is required" }}
/>
```

**Props:**
- `placeholder`: Placeholder text (default: "Pick a date")
- `dateFormat`: Format hiển thị (default: "PPP")
- Các props khác tương tự `FormInput`

### 6. FormDateRange

Date picker cho khoảng thời gian.

```jsx
<FormDateRange
  control={control}
  name="dateRange"
  label="Date Range"
  placeholder="Pick a date range"
  rules={{ required: "Date range is required" }}
/>
```

**Props:**
- Tương tự `FormDate`
- Giá trị trả về: `{ from: Date, to: Date }`

### 7. FormCheckbox

Checkbox.

```jsx
<FormCheckbox
  control={control}
  name="agree"
  label="I agree to the terms"
  rules={{ required: "You must agree" }}
/>
```

**Props:**
- Tương tự `FormInput`
- Giá trị: `boolean`

### 8. FormRadio

Radio button group.

```jsx
const genders = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
]

<FormRadio
  control={control}
  name="gender"
  label="Gender"
  options={genders}
  rules={{ required: "Gender is required" }}
/>
```

**Props:**
- `options`: Array of options (string[] hoặc {value, label}[])
- Các props khác tương tự `FormInput`

### 9. FormFileInput

File input với preview.

```jsx
<FormFileInput
  control={control}
  name="avatar"
  label="Avatar"
  accept="image/*"
  rules={{ required: "Avatar is required" }}
/>
```

**Props:**
- `accept`: File types accepted (optional)
- Các props khác tương tự `FormInput`

## Ví dụ đầy đủ

```jsx
import { useForm } from "react-hook-form"
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
} from "@/components/form"

function MyForm() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      age: 0,
      country: "",
      // ...
    },
  })

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Các form components */}
    </form>
  )
}
```

## Validation Rules

Sử dụng `rules` prop để thêm validation:

```jsx
rules={{
  required: "This field is required",
  min: { value: 0, message: "Must be at least 0" },
  max: { value: 100, message: "Must be at most 100" },
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: "Invalid email address"
  },
  validate: (value) => value === "test" || "Must be 'test'"
}}
```

## Disable Field

```jsx
<FormInput
  control={control}
  name="email"
  disabled={true}
/>
```

## Custom Error Message

```jsx
<FormInput
  control={control}
  name="email"
  error="Custom error message"
/>
```

## Styling

Tất cả components hỗ trợ `className` prop để custom styling:

```jsx
<FormInput
  control={control}
  name="email"
  className="custom-class"
/>
```

