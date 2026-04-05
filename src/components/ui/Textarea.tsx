import React from "react";
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
} from "../../lib/validators/inputs";

type ValidatorType =
  | "integer"
  | "positiveInteger"
  | "nonNegativeInteger"
  | "negativeInteger"
  | "letters"
  | "alphanumeric"
  | "email"
  | "password"
  | "any";

type TextareaProps = {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void; // ← Importante para React Hook Form
  placeholder?: string;
  className?: string;
  validatorType?: ValidatorType;
  error?: string; // ← Para mostrar errores de validación
  rows?: number;
  name?: string; // ← Útil para RHF
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
};

const Textarea = ({
  value,
  onChange,
  onBlur,
  placeholder,
  className = "",
  validatorType = "any",
  name,
  error,
  rows = 3,
}: TextareaProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;

    if (text === "") {
      onChange(text);
      return;
    }

    // Solo validamos si NO es "any"
    if (validatorType && validatorType !== "any") {
      const schema = validatorMap[validatorType];
      const result = schema.safeParse(text);

      if (!result.success) {
        return; // No actualizamos el valor si falla la validación interna
      }
    }

    onChange(text);
  };

  return (
    <div className="relative">
      <textarea
        value={value}
        onChange={handleChange}
        onBlur={onBlur}
        placeholder={placeholder}
        rows={rows}
        name={name}
        className={`w-full py-3 px-4 rounded-xl text-sm border focus:outline-none resize-y
          ${error ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-600"}
          ${className}`}
      />

      {/* Mostrar error debajo del textarea */}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Textarea;
