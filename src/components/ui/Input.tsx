import { Search, SlidersHorizontal } from "lucide-react";
import { ZodString } from "zod";
import {
  lettersSchema,
  integerSchema,
  positiveIntegerSchema,
  nonNegativeIntegerSchema,
  negativeIntegerSchema,
  alphanumericSchema,
  emailSchema,
  passwordSchema,
  anyStringSchema,
  decimalSchema,
} from "../../lib/validators/inputs";

type Variant = "default" | "search" | "filter";

type ValidatorType =
  | "integer"
  | "positiveInteger"
  | "nonNegativeInteger"
  | "negativeInteger"
  | "letters"
  | "alphanumeric"
  | "email"
  | "password"
  | "any"
  | "decimal";

type AutoCompleteType =
  | "on"
  | "off"
  | "name"
  | "email"
  | "username"
  | "current-password"
  | "new-password"
  | "one-time-code"
  | "organization"
  | "street-address"
  | "country"
  | "postal-code";

type InputType = "text" | "password";

type Props = {
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  variant?: Variant;
  className?: string;
  validatorType?: ValidatorType;
  type?: InputType;
  name?: string;
  error?: string;
  autoComplete?: AutoCompleteType;
};

const variants = {
  default: "px-4 border-gray-200 focus:border-blue-500",
  search: "pl-11 pr-4 border-gray-200 focus:border-blue-500",
  filter: "pl-10 pr-10 border-gray-300 focus:border-green-500",
};

const iconMap = {
  search: <Search className="w-4 h-4" />,
  filter: <SlidersHorizontal className="w-4 h-4" />,
};

const validatorMap: Record<ValidatorType, ZodString> = {
  integer: integerSchema,
  positiveInteger: positiveIntegerSchema,
  nonNegativeInteger: nonNegativeIntegerSchema,
  negativeInteger: negativeIntegerSchema,
  letters: lettersSchema,
  alphanumeric: alphanumericSchema,
  email: emailSchema,
  password: passwordSchema,
  any: anyStringSchema,
  decimal: decimalSchema,
};

export const Input = ({
  value = "",
  onChange,
  onBlur,
  placeholder,
  variant = "default",
  className = "",
  validatorType = "any",
  type = "text",
  name,
  error,
  autoComplete = "off",
}: Props) => {
  const icon = iconMap[variant as keyof typeof iconMap];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;

    if (text === "") {
      onChange?.(text);
      return;
    }

    if (validatorType && validatorType !== "any") {
      const schema = validatorMap[validatorType];
      const result = schema.safeParse(text);

      if (!result.success) {
        return;
      }
    }

    onChange?.(text);
  };

  return (
    <div className="relative">
      {icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </div>
      )}

      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={onBlur}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`w-full py-3 rounded-xl text-sm border focus:outline-none ${
          variants[variant]
        } ${className} ${error ? "border-red-500 focus:border-red-500" : ""}`}
      />

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};
