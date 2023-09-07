import { Controller } from "react-hook-form";

export function InputComponent({
    name,
    type,
    placeholder = "",
    control,
    error,
    defaultValue,
  }) {
    return (
      <>
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue}
          render={({ field }) => (
            <input
              {...field}
              type={type}
              className="w-full border rounded-md p-2"
              placeholder={placeholder}
            />
          )}
        />
        <p className="text-red-500">{error}</p>
      </>
    );
  }
  
  