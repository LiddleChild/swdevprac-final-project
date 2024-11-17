type InputFieldProps = {
  label: string;
  name: string;
  type?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
  disabled?: boolean;
};

export default function InputField({
  label,
  name,
  type = "text",
  inputRef,
  disabled = false,
}: InputFieldProps) {
  return (
    <div className="w-full max-w-[384px]">
      <div className="text-lg">{label}</div>
      <input
        type={type}
        name={name}
        ref={inputRef}
        className="mt-2 w-full px-3 py-2 border border-ci-gray rounded-lg bg-ci-gray
              focus:outline-none focus:border-gray-400
              disabled:bg-opacity-50"
        disabled={disabled}
      />
    </div>
  );
}
