interface InputProps {
  label: string;
  type: string;
  placeholder: string;
  refs: React.RefObject<HTMLInputElement | null>;
}

export default function Input({ label, type, placeholder, refs }: InputProps) {
  return (
    <div className="flex flex-col">
      <label htmlFor="">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        ref={refs}
        className="border border-gray-300 p-2 rounded-md mt-1 flex items-center"
      />
    </div>
  );
}
