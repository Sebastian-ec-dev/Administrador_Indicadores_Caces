type Option = {
  label: string;
  value: string;
};

type Props = {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  className?: string;
  name?: string;
  error?: string;
  onBlur?: () => void;
};

const Select = ({
  value,
  onChange,
  options,
  className = "",
  name,
  error,
  onBlur,
}: Props) => {
  const handleValidators = (val: string) => {
    onChange(val);
  };

  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => handleValidators(e.target.value)}
        className={`w-full py-3 rounded-xl text-sm border focus:outline-none cursor-pointer px-4 border-gray-200 focus:border-blue-500 ${className} ${error ? "border-red-500 focus:border-red-500" : ""}`}
        name={name}
        onBlur={onBlur}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Select;
