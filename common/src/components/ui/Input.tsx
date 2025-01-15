interface InputProps {
  label: string;
  type: string;
  required: boolean;
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  variant?: "primary" | "secondary";
  refs: React.RefObject<HTMLInputElement | null>;
}

export default function Input({
  label,
  type,
  placeholder,
  onChange,
  refs,
  required,
  variant = "primary",
}: InputProps) {
  return (
    <>
      {variant === "primary" ? (
        <div className="flex flex-col">
          <label htmlFor="">{label}</label>
          {required && (
            <input
              type={type}
              placeholder={placeholder}
              ref={refs}
              onChange={onChange}
              className="border border-gray-300 p-2 rounded-md mt-1 flex items-center"
            />
          )}
        </div>
      ) : (
        <div className="flex gap-2 items-center">
          <label htmlFor="">{label}</label>
          {required && (
            <input
              type={type}
              placeholder={placeholder}
              ref={refs}
              className="border border-gray-300 p-2 rounded-md mt-1 flex items-center"
            />
          )}
        </div>
      )}
    </>
  );
}
