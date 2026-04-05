import { z } from "zod";

export const integerSchema = z
  .string()
  .regex(/^-?\d+$/, "Solo números enteros");

export const positiveIntegerSchema = z
  .string()
  .regex(/^[1-9]\d*$/, "Solo enteros positivos");

export const nonNegativeIntegerSchema = z
  .string()
  .regex(/^\d+$/, "Solo enteros positivos o cero");

export const negativeIntegerSchema = z
  .string()
  .regex(/^-\d+$/, "Solo enteros negativos");

export const lettersSchema = z
  .string()
  .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "Solo letras");

export const alphanumericSchema = z
  .string()
  .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9_]+$/, "Solo letras y números");

export const decimalSchema = z
  .string()
  .regex(/^-?(?:\d+\.?\d*|\.\d+)$/, "Solo números (enteros o decimales)");

export const emailSchema = z.string().email("Email inválido");

export const passwordSchema = z.string().min(6, "Mínimo 6 caracteres");

export const anyStringSchema = z.string();

export const modal_name_Schema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "El nombre es obligatorio" })
    .min(3, { message: "El nombre debe tener al menos 3 caracteres" }),

  description: z
    .string()
    .trim()
    .min(10, { message: "La descripción debe tener al menos 10 caracteres" })
    .max(500, {
      message: "La descripción no puede superar los 500 caracteres",
    }),
});

export type ModalForm = z.infer<typeof modal_name_Schema>;

export const qualitativeSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "El nombre es obligatorio")
    .min(3, "El nombre debe tener al menos 3 caracteres"),
  standard: z.string().trim().min(1, "El estándar es obligatorio"),
  period: z.string().trim().min(1, "Seleccione un periodo"),
  sources: z
    .string()
    .trim()
    .min(1, "Las fuentes son obligatorias")
    .min(10, "Las fuentes deben tener al menos 10 caracteres")
    .max(500, "Las fuentes no pueden superar los 500 caracteres"),
});

export type QualitativeIndicatorForm = z.infer<typeof qualitativeSchema>;

export const fundamentalElementsSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "El nombre es obligatorio")
    .min(3, "El nombre debe tener al menos 3 caracteres"),
  satisfactory: z
    .string()
    .trim()
    .min(1, "Las detalles son obligatorias")
    .min(10, "Las detalles deben tener al menos 10 caracteres")
    .max(500, "Las detalles no pueden superar los 500 caracteres"),
  quasi_satisfactory: z
    .string()
    .trim()
    .min(1, "Las detalles son obligatorias")
    .min(10, "Las detalles deben tener al menos 10 caracteres")
    .max(500, "Las detalles no pueden superar los 500 caracteres"),
  somewhat_satisfactory: z
    .string()
    .trim()
    .min(1, "Las detalles son obligatorias")
    .min(10, "Las detalles deben tener al menos 10 caracteres")
    .max(500, "Las detalles no pueden superar los 500 caracteres"),
  deficient: z
    .string()
    .trim()
    .min(1, "Las detalles son obligatorias")
    .min(10, "Las detalles deben tener al menos 10 caracteres")
    .max(500, "Las detalles no pueden superar los 500 caracteres"),
  extra_info: z
    .string()
    .trim()
    .transform((val) => (val === "" ? undefined : val))
    .refine((val) => !val || val.length >= 10, {
      message: "Debe tener al menos 10 caracteres",
    })
    .refine((val) => !val || val.length <= 500, {
      message: "Máximo 500 caracteres",
    })
    .optional(),
});

export type FundamentalElementsForm = z.infer<typeof fundamentalElementsSchema>;

export const evidenceLinkSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "El nombre es obligatorio")
    .min(3, "El nombre debe tener al menos 3 caracteres"),
  url: z.string().url({
    message: "URL inválida",
  }),
});

export type EvidenceLinkForm = z.infer<typeof evidenceLinkSchema>;

export const optionSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "El nombre de la opción es obligatorio"),
  value: z.string().min(1, "El valor es obligatorio"),
  description: z
    .string()
    .trim()
    .transform((val) => (val === "" ? undefined : val))
    .refine((val) => !val || val.length >= 5, {
      message: "Debe tener al menos 5 caracteres",
    })
    .refine((val) => !val || val.length <= 500, {
      message: "Máximo 500 caracteres",
    })
    .optional(),
});

export const variableSchema = z.object({
  id: z.string(),
  type: z.enum(["standard", "selection"]),
  name: z.string().min(1, "El nombre de la variable es obligatorio"),
  description: z.string().min(1, "La descripción es obligatoria"),
  options: z.array(optionSchema).optional(),
});

export const variableDefinitionSchema = z
  .object({
    variables: z.array(variableSchema),
    name: z
      .string()
      .trim()
      .min(1, "El nombre es obligatorio")
      .min(3, "El nombre debe tener al menos 3 caracteres"),

    standard: z.string().trim().min(1, "El estándar es obligatorio"),
    period: z.string().trim().min(1, "Seleccione un periodo"),
    sources: z
      .string()
      .trim()
      .min(1, "Las fuentes son obligatorias")
      .min(10, "Las fuentes deben tener al menos 10 caracteres")
      .max(500, "Las fuentes no pueden superar los 500 caracteres"),
    calculation_guidelines: z
      .string()
      .trim()
      .min(1, "Los lineamientos son obligatorias")
      .min(10, "Los lineamientos deben tener al menos 10 caracteres")
      .max(500, "Los lineamientos no pueden superar los 500 caracteres"),
  })
  // Solo mantenemos esta validación (la más importante)
  .refine(
    (data) => {
      return data.variables.every((v) => {
        if (v.type === "selection") {
          return (v.options?.length ?? 0) > 0;
        }
        return true;
      });
    },
    {
      message: "Las variables de selección deben tener al menos una opción",
      path: ["variables"],
    },
  );

export type VariableDefinitionForm = z.infer<typeof variableDefinitionSchema>;
