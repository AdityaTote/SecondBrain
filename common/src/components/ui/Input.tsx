interface InputProps {
  label: string;
  type: string;
  required: boolean;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  refs: React.RefObject<HTMLInputElement | null>;
}

export default function Input({ label, type, placeholder, onChange, refs, required }: InputProps) {
  return (
    <div className="flex flex-col">
      <label htmlFor="">{label}</label>
      {required && 
      <input
        type={type}
        placeholder={placeholder}
        ref={refs}
        onChange={onChange}
        className="border border-gray-300 p-2 rounded-md mt-1 flex items-center"
      />
      }
    </div>
  );
}
